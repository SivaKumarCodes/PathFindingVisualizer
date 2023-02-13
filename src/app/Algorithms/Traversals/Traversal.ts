import {cell, dirVectors} from "../../board/board.component";

export interface Traversal{
  getVisitedQueue() : cell[];
  getPath() : cell[];
  run():void;
}


export type vertice = {
  vertice:cell;
  distance:number;
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
export function getNeighbours(currentVertice: vertice, graph: number[][], dirVectors: dirVectors):vertice[]{

  let neighbours:vertice[] = [];

  for (let i = 0; i < dirVectors.dirx.length; i++) {
    let nextRow = currentVertice.vertice.row + dirVectors.dirx[i];
    let nextCol = currentVertice.vertice.col + dirVectors.dirY[i];

    if (nextRow < 0 || nextRow >= graph.length) continue;

    if (nextCol < 0 || nextCol >= graph[0].length) continue;

    if (graph[nextRow][nextCol] == -1)
      continue;

    let edgeWeight = graph[nextRow][nextCol];

    neighbours.push({vertice : {row:nextRow , col : nextCol} , distance : currentVertice.distance + edgeWeight});
  }

  return neighbours;
}
