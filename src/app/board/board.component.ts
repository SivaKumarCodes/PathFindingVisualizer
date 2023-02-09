import {Component, ElementRef, OnInit, Self} from '@angular/core';
import {Algorithms, Traversal} from "../Algorithms/Traversals/Traversal";
import {DFS} from "../Algorithms/Traversals/DFS";
import {BFS} from "../Algorithms/Traversals/BFS";


export type cell = {
  row: number;
  col: number;
};

export type vertice = {
  row : number;
  col : number;
  weight : number;
}

export type dirVectors = {
  dirx : number[];
  dirY : number[];
}

export type cellData = {
  row: number;
  col: number;
  visited: boolean;
  inPath: boolean;
  isWall : boolean;
};

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css'],
})
export class BoardComponent implements OnInit {
  boardRows: number;
  boardCols: number;

  cellSize:number = 20;
  printInterval:number = 10;

  dirVectors: dirVectors = {dirx : [0,0,1,-1] , dirY : [1,-1,0,0]};

  isWeighted:boolean = false;

  grid: number[][] = [];

  //sent to children
  data: cellData[] = [];
  dataOrig: cellData[] = [];

  ready:boolean = false;
  flagMove:boolean = true;

  algoSelection!:Algorithms;

  //setInterval Id
  drawBoardIntervalId!:ReturnType<typeof  setInterval>;

  //map two dimensional matrix to one-dimensional Array sent to children;
  gridDataValue: number[][] = [];
  //one dimensional Array to two-dimensional matrix;
  dataGridValue:number[] = [];

  start: cell = {row : 5 , col : 10};
  end:cell = {row:20 , col:50};

  selectedAlogorithm!:Traversal | undefined;
  flagclicked:boolean = false;

  constructor(@Self() private el: ElementRef) {
    this.boardRows = Math.floor((el.nativeElement.offsetHeight + 2) / this.cellSize);
    this.boardCols = Math.floor((el.nativeElement.offsetWidth + 2) / this.cellSize);
    this.start = this.randomCell();
    this.end = this.randomCell();
    while(this.end.row == this.start.row && this.end.col == this.start.col)
    this.end = this.randomCell();
    this.createGrid();
    this.data = [...this.dataOrig];
  }

  randomCell():cell{
    return {row : this.randomInt(1,this.boardRows) , col : this.randomInt(1,this.boardCols)};
  }

  randomInt(x:number , y:number){
    return Math.floor(Math.random() * y) + x;
  }


  createGrid(): void {
    for (let i = 0; i < this.boardRows; i++) {
      let row = [];
      let gridDataRow = [];
      for (let j = 0; j < this.boardCols; j++) {
        row.push(1);
        gridDataRow.push(this.dataOrig.length);
        this.dataOrig.push({
          visited: false,
          row: i,
          col: j,
          inPath : false,
          isWall : false
        });
      }
      this.grid.push(row);
      this.gridDataValue.push(gridDataRow);
    }
  }

  clearState():void{
    for(let i of this.data){
      i.inPath = false;
      i.visited = false;
      i.isWall = false;
    }
    for(let i = 0 ; i < this.grid.length ; i++ )
      for(let j = 0 ; j < this.grid[0].length ; j++)
          this.grid[i][j] = 0;

    this.selectedAlogorithm = undefined;
  }

  startTraversal():void{
    this.createAlgoObj();
    if(this.selectedAlogorithm != undefined)
         this.selectedAlogorithm.run();

    this.printVisited();
  }

  createAlgoObj():void{

    switch (this.algoSelection){
      case  Algorithms.DFS:
        this.selectedAlogorithm = new DFS(this.grid,this.dirVectors,this.start,this.end);
        break;
      case Algorithms.BFS:
        this.selectedAlogorithm = new BFS(this.grid,this.dirVectors,this.start,this.end);
        break;
      case Algorithms.DJIKTRAS:
        this.algoSelection = Algorithms.DJIKTRAS;
        break;
      case Algorithms.ASTAR:
        this.algoSelection = Algorithms.ASTAR;
        break;
    }
  }

  printVisited():void{
    if(this.selectedAlogorithm == undefined)
      return;
    let printQueue:cell[] = this.selectedAlogorithm.getVisitedQueue();
    this.drawBoardIntervalId = setInterval(() => {
      if(printQueue.length > 0){
        let vertice:cell = printQueue.shift() ?? {row:-1,col:-1} ;
        let index:number = this.gridDataValue[vertice.row][vertice.col];
        this.data[index].visited = true;
      }
      else{
        clearInterval(this.drawBoardIntervalId);
        setTimeout(() => {
          this.printPath();
        } , 500)
      }
    } , this.printInterval);
  }

  printPath():void{
    if(this.selectedAlogorithm == undefined)
      return;

    let pathQueue = this.selectedAlogorithm.getPath();

    let startInd = this.gridDataValue[this.start.row][this.start.col];
    this.data[startInd].inPath = true;

    this.drawBoardIntervalId = setInterval(() => {
      if(pathQueue.length > 0) {
        let vertice: cell = pathQueue.pop() ?? {row: -1, col: -1};
        let index: number = this.gridDataValue[vertice.row][vertice.col];
        this.data[index].inPath = true;
      }
      else {
        clearInterval(this.drawBoardIntervalId);
      }
    } , this.printInterval + 10 );
  }

  flipWall(vertice:cell){
   let value ;
    this.grid[vertice.row][vertice.col] >= 0 ? value = -1 : value = 0;
    this.grid[vertice.row][vertice.col] = value;
    const ind:number = this.gridDataValue[vertice.row][vertice.col];
    this.data[ind].isWall = !this.data[ind].isWall;

  }

  selectAlgorithm(selection:Algorithms):void{
    switch (selection){
      case  Algorithms.DFS:
        this.algoSelection = Algorithms.DFS;
        break;
      case Algorithms.BFS:
        this.algoSelection = Algorithms.BFS;
        break;
      case Algorithms.DJIKTRAS:
        this.algoSelection = Algorithms.DJIKTRAS;
        break;
      case Algorithms.ASTAR:
        this.algoSelection = Algorithms.ASTAR;
        break;
    }
    this.setReady(true);
  }

  setStart(data:{row:number , col:number}):void{
    if(!this.flagMove) return;

    if(data.row == this.end.row && data.col == this.end.col)
      return;
    this.start = {row:data.row , col:data.col};
  }

  setEnd(data:{row:number , col: number}):void{
    if(!this.flagMove) return;

    if(data.row == this.start.row && data.col == this.start.col)
      return;
    this.end = {row:data.row , col: data.col};
  }
  setReady(flag:boolean):void{
    this.ready = flag;
  }

  startDraw(){
    this.flagclicked  = true;
    console.log(this.flagclicked);
  }

  stopDraw(){
    this.flagclicked = false;
    console.log(this.flagclicked);
  }

  onDraw(event:{row:number,col:number}){
    if(this.flagclicked)
      this.flipWall(event);
  }




  ngOnInit(): void {}
}
