import PriorityQueue from "priority-queue-typescript";
import {cell, dirVectors} from "../../board/board.component";
import { forestToPath, Traversal} from "./Traversal";

type vertice = {
  vertice:cell;
  distance:number;
}
export class Astar implements Traversal{
  private pq:PriorityQueue<vertice>;
  private readonly start:cell;
  private readonly end:cell;
  private readonly graph:number[][];
  private readonly distances:number[][];
  private isReachedEnd:boolean = false;
  private dirVectors:dirVectors;
  private printQeueu:cell[] = [];

  getPath(): cell[] {
    if(this.isReachedEnd)
      return forestToPath(this.forest,this.start,this.end);

    return [];
  }

  getVisitedQueue(): cell[] {
    return this.printQeueu;
  }

  run(): void {
    if(this.Astar())
      this.isReachedEnd = true;
  }

  private forest:cell[][] = [];
  constructor(graph:number[][] , start:cell , end:cell , dirVectors:dirVectors ) {
    this.pq = new PriorityQueue<vertice>( graph[0].length * graph.length,(a:vertice,b:vertice) => a.distance - b.distance);
    this.graph = graph;
    this.start = start;
    this.end = end;
    this.dirVectors = dirVectors;
    this.distances = [];

    for(let i of graph)
      this.forest.push([]);

    for(let i = 0 ; i < graph.length ; i++) {
      this.distances.push([]);
      for (let j = 0; j < graph[0].length; j++) {
        this.distances[i].push(Number.MAX_VALUE);
      }
    }
  }

  heuristic(x:cell):number{
    let dx:number = Math.abs(x.row  - this.end.row);
    let dy:number = Math.abs(x.col - this.end.col);

    // return  D * (dx + dy) + (D2 - 2 * D) * Math.min(dx , dy);
    return  dx  * dy + dy  * dx;
  }


  Astar():boolean {
    this.distances[this.start.row][this.start.col] = 0 + this.heuristic(this.start);
    this.pq.add({distance : 0 , vertice : this.start})
    this.printQeueu.push(this.start);

    while (this.pq.size() > 0) {

      let v: vertice = this.pq.poll() ?? {distance : 0 , vertice:this.start};

      for (let i = 0; i < this.dirVectors.dirx.length; i++) {
        let nextRow = v.vertice.row + this.dirVectors.dirx[i];
        let nextCol = v.vertice.col + this.dirVectors.dirY[i];

        if (nextRow < 0 || nextRow >= this.graph.length) continue;

        if (nextCol < 0 || nextCol >= this.graph[0].length) continue;

        if(this.graph[nextRow][nextCol] == -1)
          continue;

        let edgeWeight = this.graph[nextRow][nextCol];

        let nextCell = {row : nextRow , col : nextCol};

        let alt = v.distance + edgeWeight  + this.heuristic(nextCell) ;

        if(alt < this.distances[nextRow][nextCol]) {
          this.distances[nextRow][nextCol] = alt;
          this.pq.add({distance : this.distances[nextRow][nextCol] , vertice : nextCell});
          this.printQeueu.push(nextCell);
          this.forest[nextRow][nextCol] = v.vertice;
        }

        if(nextRow == this.end.row && nextCol == this.end.col)
          return true;
      }
    }
    return false;
  }

}
