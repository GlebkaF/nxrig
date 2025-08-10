import { config } from './config';
import { createDefaultChain } from './helpers/create-default-chain';
import { Blocks } from './interface';
import { NuxMp3PresetIndex } from './const';

export interface EncodedChain {
  bytes: number[];
  qrCode: string;
}

export function encodeChainToBytes(chain: ReturnType<typeof createDefaultChain>): EncodedChain {
  const bytes = new Array(100).fill(0);
  
  Object.entries(chain).forEach(([blockKey, blockData]) => {
    const blockType = blockKey as Blocks;
    const blockConfig = config[blockType];
    
    if (!blockConfig?.types) return;
    
    const typeConfig = blockConfig.types.find(type => type.label === blockData.type);
    if (!typeConfig) return;
    
    const headIndex = getHeadIndex(blockType);
    if (headIndex !== -1) {
      bytes[headIndex] = blockData.enabled ? typeConfig.encodeType : 0;
    }
    
    typeConfig.params.forEach(paramConfig => {
      const paramValue = blockData.params[paramConfig.label];
      if (paramValue !== undefined) {
        bytes[paramConfig.encodeIndex] = paramValue;
      }
    });
  });
  
  return {
    bytes,
    qrCode: bytes.map(byte => byte.toString().padStart(3, '0')).join('')
  };
}

function getHeadIndex(blockType: Blocks): number {
  switch (blockType) {
    case Blocks.Noisegate: return NuxMp3PresetIndex.Head_iNG;
    case Blocks.Compressor: return NuxMp3PresetIndex.Head_iCMP;
    case Blocks.Modulation: return NuxMp3PresetIndex.Head_iMOD;
    case Blocks.Effect: return NuxMp3PresetIndex.Head_iEFX;
    case Blocks.Amplifier: return NuxMp3PresetIndex.Head_iAMP;
    case Blocks.Cabinet: return NuxMp3PresetIndex.Head_iCAB;
    case Blocks.Eq: return NuxMp3PresetIndex.Head_iEQ;
    case Blocks.Reverb: return NuxMp3PresetIndex.Head_iRVB;
    case Blocks.Delay: return NuxMp3PresetIndex.Head_iDLY;
    default: return -1;
  }
}

export function encodeDefaultChain(): EncodedChain {
  const defaultChain = createDefaultChain();
  return encodeChainToBytes(defaultChain);
}
