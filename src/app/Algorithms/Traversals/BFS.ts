import {forestToPath, Traversal} from "./Traversal";
import {cell, dirVectors} from "../../board/board.component";

export class BFS implements Traversal{

  start:cell;
  end:cell;
  graph:number[][];
  visited:boolean[][];

  path!:cell[];

  isEndReached:boolean = false;

  dirVectors:dirVectors;

  printQueue:cell[];
  q : cell[];

  forest:cell[][];


  constructor(graph:number[][] , dirVectors:dirVectors , start:cell , end:cell) {
    this.graph = graph;
    this.start = start;
    this.end = end;
    this.visited = [];
    this.forest = [];

    for(let i of graph){
      this.visited.push([]);
      this.forest.push([]);
      }

    this.printQueue = [];
    this.q = [];
    this.dirVectors = dirVectors;
  }

  bfs():boolean {
    this.q.push({ row: this.start.row, col: this.start.col });
    this.visited[this.start.row][this.start.col] = true;
    this.printQueue.push({ row: this.start.row, col: this.start.col });

    while (this.q.length > 0) {
      let vertice: cell = this.q.shift()!;

      for (let i = 0; i < this.dirVectors.dirx.length; i++) {
        let nextRow = vertice.row + this.dirVectors.dirx[i];
        let nextCol = vertice.col + this.dirVectors.dirY[i];

        if (nextRow < 0 || nextRow >= this.graph.length) continue;

        if (nextCol < 0 || nextCol >= this.graph[0].length) continue;

        if (this.visited[nextRow][nextCol]) continue;

        if(this.graph[nextRow][nextCol] == -1)
          continue;

        let nextCell = {row : nextRow , col : nextCol};

        this.visited[nextRow][nextCol] = true;
        this.q.push(nextCell);
        this.printQueue.push(nextCell);
        this.forest[nextRow][nextCol] = vertice;

        if(nextRow == this.end.row && nextCol == this.end.col)
          return true;

      }
    }
    return false;
  }

  run(): void {
    if(this.bfs())
       this.isEndReached = true;
    if(this.isEndReached)
        this.path = forestToPath(this.forest,this.start,this.end);
  }

  getPath(): cell[] {
    if(this.isEndReached)
    return this.path;
    else
      return [];
  }

  getVisitedQueue(): cell[] {
    return this.printQueue;
  }

}
