import { NextApiRequest, NextApiResponse } from 'next';
import OpenAI from 'openai';
import { createDefaultChain } from '../../lib/core/helpers/create-default-chain';
import { Chain } from '../../lib/core/interface';

// Инициализация OpenAI клиента
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Системный промпт с информацией о структуре chain
const SYSTEM_PROMPT = `You are an expert in audio processing and guitar effects. Your task is to generate a chain configuration for a guitar effects processor based on the user's description of the desired sound.

The chain consists of the following blocks in this order:
1. Noisegate - noise reduction
2. Compressor - dynamic range control
3. Effect - distortion/overdrive effects
4. Modulation - chorus, flanger, phaser, etc.
5. Amplifier - amp simulation
6. Cabinet - cabinet/speaker simulation
7. EQ - equalization
8. Delay - echo/delay effects
9. Reverb - room/hall reverb

Each block has:
- enabled: boolean (whether the block is active)
- type: string (specific effect type)
- params: object with parameter values (0-100 range for most parameters)

Available types and their parameters:

NOISEGATE:
- "HARD": Threshold, Decay
- "SOFT": Threshold, Decay

COMPRESSOR:
- "K Comp": Level, Sustain, Clipping
- "Compressor": Level, Sustain, Attack, Tone
- "Rose Comp": Level, Sustain

EFFECT:
- "Distortion+": Output, Sensitivity
- "RC Boost": Volume, Gain, Bass, Treble
- "AC Boost": Volume, Gain, Bass, Treble
- "Dist One": Level, Drive, Tone
- "T Screamer": Level, Drive, Tone
- "Blues Drive": Level, Gain, Tone
- "Morning Drive": Volume, Drive, Tone
- "Eat Dist": Volume, Distortion, Filter
- "Red Dirt": Level, Drive, Tone
- "Crunch": Volume, Gain, Tone
- "Muff Fuzz": Volume, Sustain, Tone
- "Katana": Volume, Boost
- "ST Singer": Volume, Gain, Filter
- "Touch Wah": Type, Wow, Sense, Level, "Up/Down Switch"

MODULATION:
- "CE-1": Rate, Depth, Intensity
- "CE-2": Rate, Depth
- "ST Chorus": Rate, Width, Intensity
- "Vibrato": Rate, Depth
- "Detune": Shift-L, Shift-R, Mix
- "Flanger": Rate, Width, Level, Feedback
- "Phase 90": Speed
- "Phase 100": Speed, Intensity
- "SCF": Speed, Width, Intensity, Mode
- "U-Vibe": Speed, Volume, Intensity, Mode
- "Tremolo": Rate, Depth
- "Rotary": Speed, Balance
- "SCH-1": Rate, Depth, Tone
- "Mono Octave": Sub, Dry, Up

AMPLIFIER (common params: Gain, Master, Bass, Middle, Treble, Presence/Bright/Cut):
- "Jazz Clean", "Deluxe Rvb", "Bass Mate", "Tweedy", "Hiwire", "Cali Crunch"
- "Class A15", "Class A30", "Plexi 100", "Plexi 45", "Brit 800", "1987X50"
- "Slo 100", "Fireman HBE", "Dual Rect", "Die VH4", "MrZ 38", "Super Rvb"
- "Agl", "Mld", "Optima Air", "Stageman", "Twin Reverb", "Vibro King"
- "Budda", "Brit Blues", "Match D30", "Brit 2000", "Uber Hi Gain"

CABINET:
- Various cabinet types like "JZ 120", "DR 112", "TR 212", etc.
- Parameters: Level, LowCut, HighCut

EQ:
- "6 Band": 100, 220, 500, 1200, 2600, 6400
- "10 Band": 31.25, 62.5, 125, 250, 500, 1K, 2K, 4K, 8K, 16K

DELAY:
- "Analog Delay": Intensity, Rate, Echo
- "Digital Delay": E.Level, Feedback, Time
- "Mod Delay": Level, Time, Repeat, Mod
- "Tape Echo": Level, Time, Repeat
- "Pan Delay": Level, Time, Repeat
- "Phi Delay": Time, Repeat, Mix

REVERB:
- "Room": Level, Decay, Tone
- "Hall": Level, Decay, PreDelay, Liveliness
- "Plate": Level, Decay
- "Spring": Level, Decay
- "Shimmer": Mix, Decay, Shimmer
- "Damp": Mix, Depth

Return a valid JSON object with the complete chain configuration. Make intelligent choices based on the sound description. For example:
- Clean sounds: minimal distortion, possibly chorus/reverb
- Rock sounds: overdrive/distortion, amp simulation, some delay
- Metal sounds: high gain distortion, tight gate, compressed
- Ambient sounds: heavy reverb, delay, modulation effects

IMPORTANT: Return ONLY the JSON object, no additional text or markdown formatting.`;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { description } = req.body;

  if (!description || typeof description !== 'string') {
    return res.status(400).json({ error: 'Description is required' });
  }

  if (!process.env.OPENAI_API_KEY) {
    return res.status(500).json({ 
      error: 'OpenAI API key not configured. Please add OPENAI_API_KEY to your .env.local file' 
    });
  }

  try {
    // Получаем базовый chain для структуры
    const defaultChain = createDefaultChain();

    // Запрос к GPT-4
    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: SYSTEM_PROMPT
        },
        {
          role: "user",
          content: `Generate a chain configuration for this sound: ${description}`
        }
      ],
      temperature: 0.7,
      max_tokens: 2000,
    });

    const responseText = completion.choices[0]?.message?.content;
    
    if (!responseText) {
      throw new Error('No response from OpenAI');
    }

    try {
      // Парсим JSON ответ
      const generatedChain = JSON.parse(responseText) as Chain;
      
      // Валидация структуры
      const requiredBlocks = [
        'noisegate', 'compressor', 'modulation', 'effect', 
        'amplifier', 'cabinet', 'eq', 'delay', 'reverb'
      ];
      
      for (const block of requiredBlocks) {
        if (!generatedChain[block as keyof Chain]) {
          throw new Error(`Missing required block: ${block}`);
        }
      }

      return res.status(200).json({ 
        success: true, 
        chain: generatedChain,
        description: description 
      });
    } catch (parseError) {
      console.error('Failed to parse GPT response:', responseText);
      console.error('Parse error:', parseError);
      
      // Возвращаем дефолтный chain с сообщением об ошибке
      return res.status(200).json({ 
        success: false,
        chain: defaultChain,
        error: 'Failed to parse AI response. Returning default chain.',
        description: description
      });
    }
  } catch (error) {
    console.error('OpenAI API error:', error);
    
    // Проверяем тип ошибки
    if (error instanceof Error) {
      if (error.message.includes('API key')) {
        return res.status(500).json({ 
          error: 'Invalid OpenAI API key. Please check your .env.local file' 
        });
      }
    }
    
    return res.status(500).json({ 
      error: 'Failed to generate chain. Please try again.' 
    });
  }
}