import {Traversal} from "./Traversal";
import {cell, dirVectors} from "../../board/board.component";
import {forestToPath} from "./Traversal";


export class DFS implements Traversal{
  private readonly start:cell;
  private readonly end:cell;

  private isEndReached!:boolean;

  private path!: cell[];
  private readonly graph : number[][];
  private readonly visited : boolean[][];
  private readonly dirVector:dirVectors;
  private readonly printQueue:cell[];
  private readonly forest:cell[][];
  constructor(graph:number[][] , dirVector:dirVectors , start:cell , end:cell) {
    this.graph = graph;
    this.visited = [];
    this.forest = [];
    this.dirVector = dirVector;
    this.printQueue = [];
    this.start = start;
    this.end = end;
    this.isEndReached = false;

    for(let i of graph) {
      this.visited.push([]);
      this.forest.push([]);
    }

  }

  dfs(start:cell): boolean {
    this.visited[start.row][start.col] = true;
    this.printQueue.push({ row: start.row , col: start.col });

    if(start.row == this.end.row && start.col == this.end.col )
      return true;

    for (let i = 0; i < this.dirVector.dirx.length; i++) {
      let nextRow = start.row + this.dirVector.dirx[i];
      let nextCol = start.col + this.dirVector.dirY[i];
      let nextCell = {row:nextRow , col:nextCol};


      if (nextRow < 0 || nextRow >= this.graph.length) continue;

      if (nextCol < 0 || nextCol >= this.graph[0].length) continue;

      if (this.visited[nextRow][nextCol]) continue;

      this.forest[nextRow][nextCol] = start;

      if(this.dfs({row:nextRow,col:nextCol}))
          return true;

    }

    return false;
  }
  run():void{
    if (this.dfs(this.start))
      this.isEndReached = true;

    if(this.isEndReached)
      this.path = forestToPath(this.forest , this.start , this.end);
  }

  getPath(): cell[] {
    return this.path;
  }
  getVisitedQueue(): cell[] {
    return this.printQueue;
  }
}
