import {cell} from "../../board/board.component";

export interface Traversal{
  getVisitedQueue() : cell[];
  getPath() : cell[];
  run():void;
}

export enum Algorithms {
  "DFS",
  "BFS",
  "ASTAR",
  "DJIKTRAS"
}
export function forestToPath(forest:cell[][] , start:cell , end:cell):cell[]{
  let path:cell[] = []
  let walk = end;

  while(JSON.stringify(walk) != JSON.stringify(start)){
    path.push(walk);
      walk = forest[walk.row][walk.col];
  }
  return path;
}
