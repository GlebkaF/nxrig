// Типы для блоков сигнальной цепи
export interface BaseBlock {
  slot: string;
  model: string;
  enabled?: boolean;
  params?: Record<string, number | string>;
}

export interface EqBlock extends BaseBlock {
  slot: "EQ";
  params: Record<string, number>;
}

// @ts-expect-error TODO: fix this
export interface CabinetBlock extends BaseBlock {
  slot: "Cabinet";
  params?: {
    CAB_Para4?: number;
    CAB_Para5?: number;
    CAB_Para6?: number;
    level?: number;
    lowcut?: number;
    hicut?: number;
    [key: string]: number | undefined;
  };
}

// @ts-expect-error TODO: fix this
export interface DelayBlock extends BaseBlock {
  slot: "Delay";
  params?: {
    DLY_Para1?: number;
    DLY_Para2?: number;
    DLY_Para3?: number;
    mix?: number;
    feedback?: number;
    time?: number;
    [key: string]: number | undefined;
  };
}

export interface CompressorBlock extends BaseBlock {
  slot: "Compressor";
  params?: Record<string, number>;
}

export type Block =
  | BaseBlock
  | EqBlock
  | CabinetBlock
  | DelayBlock
  | CompressorBlock;

export interface ChainData {
  chain: Block[];
}
