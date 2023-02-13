import {cell} from "../../board/board.component";

export enum MazeEnum{
  "BinaryTreeMaze"
}

export interface MazeGenerator{
  generateMaze():void;
  getPrintQueue():cell[];
}
