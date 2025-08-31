import sweetHomeAlabamaGuitarIntro from "./preset/sweet-home-alabama-guitar-intro";
import comeAsYouAreGuitarIntro from "./preset/come-as-you-are-guitar-intro";
import enterSandmanGuitarMainRiff from "./preset/enter-sandman-guitar-main-riff";
import crazyTrainGuitarIntro from "./preset/crazy-train-guitar-intro";
import sweetChildOMineGuitarIntro from "./preset/sweet-child-o-mine-guitar-intro";
import stairwayToHeavenGuitarSolo from "./preset/stairway-to-heaven-guitar-solo";
import stairwayToHeavenGuitarIntro from "./preset/stairway-to-heaven-guitar-intro";
import masterOfPuppetsGuitarMainRiff from "./preset/master-of-puppets-guitar-main-riff";
import beforeIForgetGuitarIntro from "./preset/before-i-forget-guitar-intro";
import sorryYoureNotAWinnerGuitarIntro from "./preset/sorry-youre-not-a-winner-guitar-intro";
import wakingTheDemonGuitarMainRiff from "./preset/waking-the-demon-guitar-main-riff";
import sonneGuitarMainRiff from "./preset/sonne-guitar-main-riff";
import backInBlackGuitarIntro from "./preset/back-in-black-guitar-intro";
import nothingElseMattersGuitarIntro from "./preset/nothing-else-matters-guitar-intro";
import panteraFloodsIntro from "./preset/pantera-floods-intro";
import panteraFloodsSolo from "./preset/pantera-floods-solo";
import panteraFloodsOutroSolo from "./preset/pantera-floods-outro-solo";
import oneGuitarIntro from "./preset/one-guitar-intro";

import myWayCleanGuitarIntro from "./preset/my-way-clean-guitar-intro";
import jimiHendrixHeyJoeWhole from "./preset/jimi-hendrix-hey-joe-whole";
import scarTissueGuitarIntro from "./preset/rhcp-scar-tissue-guitar-intro";
import deepPurpleSmokeOnTheWaterGuitarIntro from "./preset/smoke-on-the-water-guitar-intro";
import { validateChain } from "lib/core/schemas";

export const presets = [
  sweetHomeAlabamaGuitarIntro,
  comeAsYouAreGuitarIntro,
  enterSandmanGuitarMainRiff,
  crazyTrainGuitarIntro,
  sweetChildOMineGuitarIntro,
  stairwayToHeavenGuitarSolo,
  stairwayToHeavenGuitarIntro,
  masterOfPuppetsGuitarMainRiff,
  beforeIForgetGuitarIntro,
  sorryYoureNotAWinnerGuitarIntro,
  wakingTheDemonGuitarMainRiff,
  sonneGuitarMainRiff,
  backInBlackGuitarIntro,
  nothingElseMattersGuitarIntro,
  panteraFloodsIntro,
  panteraFloodsSolo,
  panteraFloodsOutroSolo,
  oneGuitarIntro,
  myWayCleanGuitarIntro,
  jimiHendrixHeyJoeWhole,
  scarTissueGuitarIntro,
  deepPurpleSmokeOnTheWaterGuitarIntro,
];

presets.forEach((preset) => {
  preset.chain = validateChain(preset.chain);
});
