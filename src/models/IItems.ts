export interface ICode{
  ID?: number;
  Title: string;
  Value: string;
  CType: string;
}

export interface IItems {
  ID?: number;
  IType: string;
  Title: string;
  Model: string;
  Brand: string;
  Image: string;
  RetailPrice: number;
  EmpDiscPrice: number;
  PercDisc: number;
  Code: ICode;
}
