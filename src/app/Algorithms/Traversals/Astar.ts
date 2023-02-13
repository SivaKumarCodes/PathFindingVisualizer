import PriorityQueue from "priority-queue-typescript";
import {cell, dirVectors} from "../../board/board.component";
import {forestToPath, getNeighbours, Traversal, vertice} from "./Traversal";

export class Astar implements Traversal{
  private pq:PriorityQueue<vertice>;
  private readonly start:cell;
  private readonly end:cell;
  private readonly graph:number[][];
  private readonly distances:number[][];
  private isReachedEnd:boolean = false;
  private dirVectors:dirVectors;
  private printQeueu:cell[] = [];

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
    return dx + dy ;
  }


  Astar():boolean {
    this.distances[this.start.row][this.start.col] = 0 + this.heuristic(this.start);
    this.pq.add({distance : 0 , vertice : this.start})
    this.printQeueu.push(this.start);

    while (this.pq.size() > 0) {

      let currentVertice: vertice = this.pq.poll() ?? {distance : 0 , vertice:this.start};

      let neighbours = getNeighbours(currentVertice , this.graph , this.dirVectors);

      let flag:boolean = false;

      neighbours.forEach((node)=>{
        let row = node.vertice.row;
        let col = node.vertice.col;
        let distance = node.distance;

        node.distance  += this.heuristic({row,col})

        if( node.distance < this.distances[row][col]) {
          this.distances[row][col] = node.distance;
          this.pq.add({distance : node.distance , vertice : node.vertice});
          this.printQeueu.push({row,col});
          this.forest[row][col] = {row : currentVertice.vertice.row , col : currentVertice.vertice.col};
        }
        if(row == this.end.row && col == this.end.col)
          flag = true;
      })

      if(flag) return true;
    }

    return false;
  }

  getNearestCell(){
    this.visitedNeighbours.sort((a ,b) => a.distance - b.distance);
    return this.visitedNeighbours[0];
  }


}
