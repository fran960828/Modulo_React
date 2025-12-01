type square = {
  row:number,
  col:number
}
export interface Iturns {
  square:square,
  player:string
}
export interface IplayerProp {
  initialName: string;
  symbol: string;
  isActive:boolean;
  onSelectedName:(symbol:string,newName:string)=>void
}
export interface IboardProp {
  board: (string | null)[][];
  onSelectTurns:(rowIndex:number,colIndex:number)=>void
}
export interface Ilog {
  gameturns:Iturns[]
}

export interface Igameover {
    winner:string|undefined,
    onRematch:()=>void
}
export interface Iplayer {
  X:string,
  O:string
}