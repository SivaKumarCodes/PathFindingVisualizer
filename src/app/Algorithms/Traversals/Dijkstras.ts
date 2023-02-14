import PriorityQueue from "priority-queue-typescript";
import {cell, dirVectors} from "../../board/board.component";
import { forestToPath, Traversal } from "./Traversal";

type vertice = {
  vertice:cell,
  distance:number;
}


export class Dijkstras implements Traversal{
  private priority:vertice[];
  private start:cell;
  private end:cell;
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
    if(this.djikstras())
      this.isReachedEnd = true;
  }

  private forest:cell[][] = [];
  constructor(graph:number[][] , start:cell , end:cell , dirVectors:dirVectors ) {
    this.graph = graph;
    this.start = start;
    this.end = end;
    this.dirVectors = dirVectors;
    this.distances = [];
    this.priority = [];

    for(let i of graph)
      this.forest.push([]);

    for(let i = 0 ; i < graph.length ; i++) {
      this.distances.push([]);
      for (let j = 0; j < graph[0].length; j++) {
        this.distances[i].push(Number.MAX_VALUE);
      }
    }
  }


  djikstras():boolean {

    this.distances[this.start.row][this.start.col] = 0;
    this.priority.push({distance : 0 , vertice : this.start})
    this.printQeueu.push(this.start);

    while (this.priority.length > 0) {
      let v: vertice = this.getNearestCell();

      for (let i = 0; i < this.dirVectors.dirx.length; i++) {
        let nextRow = v.vertice.row + this.dirVectors.dirx[i];
        let nextCol = v.vertice.col + this.dirVectors.dirY[i];

        if (nextRow < 0 || nextRow >= this.graph.length) continue;

        if (nextCol < 0 || nextCol >= this.graph[0].length) continue;

        if(this.graph[nextRow][nextCol] == -1)
          continue;

        let edgeWeight = this.graph[nextRow][nextCol];

        let nextCell = {row : nextRow , col : nextCol};

        let alt = v.distance + edgeWeight;

        if(alt < this.distances[nextRow][nextCol]) {
          this.distances[nextRow][nextCol] = alt;
          this.priority.push({distance : this.distances[nextRow][nextCol] , vertice : nextCell});
          this.printQeueu.push(nextCell);
          this.forest[nextRow][nextCol] = v.vertice;
        }

        if(nextRow == this.end.row && nextCol == this.end.col)
          return true;
      }
    }
    return false;
  }

  private  getNearestCell():vertice{
    this.priority.sort((a ,b) => a.distance - b.distance);
    let result:vertice =  this.priority[0];
    this.priority.splice(0,1);

    return result;
  }

}
