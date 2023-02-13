import {MazeGenerator} from "./MazeGenerator";
import {cell} from "../../board/board.component";

export class BinaryTreeMaze implements MazeGenerator{
  graph:number[][];
  printQueue:cell[];

  visitedMap:boolean[][];

  wallMap:boolean[][];

  constructor(graph:number[][]) {
    this.graph = graph;
    this.printQueue = [];
    this.visitedMap = [];
    this.wallMap = [];

    for(let i of this.graph) {
      this.visitedMap.push([]);
      this.wallMap.push([]);
    }
  }

  public generateMaze(){
    for (let i = 0  ; i < this.graph.length ; i++)
      for (let j = 0 ;  j  < this.graph[i].length ; j++)
        this.graph[i][j] = -1;

    for (let i = 0  ; i < this.graph.length ; i++)
      for (let j = 0 ;  j  < this.graph[i].length ; j++){

        if(this.visitedMap[i][j]  ) continue;

        let neighbours:cell[] = this.getNeighbours({row:i,col:j});
        if(neighbours.length == 0) continue;

        if(neighbours.length < 2) {
          let singleNeighbour: cell = neighbours[0];
          this.visitedMap[singleNeighbour.row][singleNeighbour.col] = true;
          this.wallMap[singleNeighbour.row][singleNeighbour.col] = true;
          this.graph[singleNeighbour.row][singleNeighbour.col] = 1;
        }

        if(neighbours.length > 1){
          let randomNode:number = Math.round(Math.random());
          let selectedNode:cell = neighbours[randomNode];
          this.wallMap[selectedNode.row][selectedNode.col] = true;
          this.graph[selectedNode.row][selectedNode.col] = 1;
          neighbours.forEach((vertice:cell) => this.visitedMap[vertice.row][vertice.col] = true)
        }
      }

    for(let i:number = 0 ; i <  this.graph.length ; i++ )
        for (let j = 0 ;  j  < this.graph[i].length ; j++){
          if(!this.wallMap[i][j])
            this.printQueue.push({row : i , col :j })
        }
  }

  private getNeighbours(node:cell):cell[]{
    let neighbours:cell[] = [];
    if(node.row  > 0) neighbours.push({row : node.row - 1 , col : node.col})
    if(node.col  > 0) neighbours.push({row : node.row  , col : node.col - 1})
    return neighbours;
  }

  getPrintQueue(): cell[] {
    return this.printQueue;
  }
}

