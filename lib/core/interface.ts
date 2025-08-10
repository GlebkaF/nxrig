export interface BlockConfig {
  types: TypeConfig[];
}

interface TypeConfig {
  label: string;
  realName: string;
  encodeType: number;
  params: TypeParamConfig[];
}

export interface TypeParamConfig {
  label: string;
  encodeIndex: number;
}
