import PriorityQueue from "priority-queue-typescript";
import {cell, dirVectors} from "../../board/board.component";
import {forestToPath, getNeighbours, Traversal, vertice} from "./Traversal";

export class Astar implements Traversal{

  private priority:vertice[] = [];
  private readonly start:cell;
  private readonly end:cell;
  private readonly graph:number[][];
  private readonly distances:number[][];
  private isReachedEnd:boolean = false;
  private dirVectors:dirVectors;
  private printQeueu:cell[] = [];

  private heuristics:number[][] = [];
  private visitedNeighbours:vertice[] = [];

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
    console.log(this.priority)
  }

  private forest:cell[][] = [];
  constructor(graph:number[][] , start:cell , end:cell , dirVectors:dirVectors ) {
    this.graph = graph;
    this.start = start;
    this.end = end;
    this.dirVectors = dirVectors;
    this.distances = [];

    for(let i of graph) {
      this.forest.push([]);
      this.heuristics.push([]);
    }

    for(let i = 0 ; i < graph.length ; i++) {
      this.distances.push([]);
      for (let j = 0; j < graph[0].length; j++) {
        this.distances[i].push(Number.MAX_VALUE);
        this.heuristics[i].push(0);
      }
    }
  }

  heuristic(x:cell):number{
    let dx:number = Math.abs(x.row  - this.end.row);
    let dy:number = Math.abs(x.col - this.end.col);

    return dx + dy ;
  }


  Astar():boolean {
    this.distances[this.start.row][this.start.col] = 0;
    let startHeuristic = this.heuristic(this.start);
    this.heuristics[this.start.row][this.start.col] = startHeuristic;
    this.priority.push({distance : 0 , totalDistance: 0 + startHeuristic , vertice : this.start})
    this.printQeueu.push(this.start);

    while (this.priority.length > 0) {
      console.log('hell0');

      let currentVertice: vertice = this.getNearestCell();

      let flag:boolean = false;

      for (let i = 0; i < this.dirVectors.dirx.length; i++) {
        let nextRow = currentVertice.vertice.row + this.dirVectors.dirx[i];
        let nextCol = currentVertice.vertice.col + this.dirVectors.dirY[i];

        if (nextRow < 0 || nextRow >= this.graph.length) continue;

        if (nextCol < 0 || nextCol >= this.graph[0].length) continue;

        if (this.graph[nextRow][nextCol] == -1)
          continue;

        let row = nextRow;
        let col = nextCol;

        this.heuristics[row][col] = this.heuristic({row,col})


        if(currentVertice.distance + this.graph[row][col]  < this.distances[row][col]) {
          this.distances[row][col] = currentVertice.distance + this.graph[row][col];
          let heuristic = this.heuristic({row:row,col:col});
          this.heuristics[row][col] = heuristic;

          this.priority.push({distance : this.distances[row][col] , totalDistance : heuristic + this.distances[row][col]  ,  vertice : {row : row , col : col}});
          this.printQeueu.push({row,col});
          this.forest[row][col] = {row : currentVertice.vertice.row , col : currentVertice.vertice.col};
        }
        if(row == this.end.row && col == this.end.col)
          return  true;

    }
      }


    return false;
  }

private  getNearestCell():vertice{
    this.priority.sort((a ,b) => a.totalDistance - b.totalDistance);
    let result:vertice =  this.priority[0];
    console.log(this.priority.length);
    this.priority.splice(0,1);
    console.log(this.priority.length);

    return result;
  }

}
