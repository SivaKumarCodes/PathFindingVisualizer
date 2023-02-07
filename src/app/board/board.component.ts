import { Component, ElementRef, OnInit, Self } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

export type cell = {
  row: number;
  col: number;
};

export type vertice = {
  row : number;
  col : number;
  weight : number;
}

export type cellData = {
  row: number;
  col: number;
  visited: boolean;
};

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css'],
})
export class BoardComponent implements OnInit {
  boardRows: number;
  boardCols: number;

  grid: number[][] = [];
  visited: boolean[][] = [];
  visitedDummy: boolean[][] = [];
  //sent to children
  data: cellData[] = [];
  dataDummy: cellData[] = [];

  //setInterval Id
  drawBoardIntervalId!: any;

  //Queue for drawing cells
  q: cell[] = [];

  //map two dimensional matrix to data sent to children;
  gridDataValue: number[][] = [];

  //grid directions
  dirX: number[] = [-1, 0, 1, 0];
  dirY: number[] = [0, 1, 0, -1];

  start: cell = {row : 5 , col : 10};
  end:cell = {row:20 , col:50};

  constructor(@Self() private el: ElementRef, private sanitizor: DomSanitizer) {
    this.boardRows = Math.floor((el.nativeElement.offsetHeight + 2) / 22);
    this.boardCols = Math.floor((el.nativeElement.offsetWidth + 2) / 22);

    this.fillGrid();
    this.data = [...this.dataDummy];
    this.visited = [...this.visitedDummy];
  }

  fillGrid(): void {
    for (let i = 0; i < this.boardRows; i++) {
      let row = [];
      let visRow = [];
      let gridDataRow = [];
      for (let j = 0; j < this.boardCols; j++) {
        row.push(1);
        visRow.push(false);
        gridDataRow.push(this.dataDummy.length);
        this.dataDummy.push({
          visited: false,
          row: i,
          col: j,
        });
      }
      this.grid.push(row);
      this.visitedDummy.push(visRow);
      this.gridDataValue.push(gridDataRow);
    }
  }

  dfs(row: number, col: number): void {
    this.visited[row][col] = true;
    this.q.push({ row: row, col: col });
    for (let i = 0; i < this.dirX.length; i++) {
      let nextRow = row + this.dirX[i];
      let nextCol = col + this.dirY[i];

      if (nextRow < 0 || nextRow >= this.grid.length) continue;

      if (nextCol < 0 || nextCol >= this.grid[0].length) continue;

      if (this.visited[nextRow][nextCol]) continue;

      this.dfs(nextRow, nextCol);
    }
  }

  bfs(startRow: number, startCol: number) {
    let q: cell[] = [];
    q.push({ row: startRow, col: startCol });
    this.visited[startRow][startCol] = true;
    this.q.push({ row: startRow, col: startCol });

    while (q.length > 0) {
      let vertice: cell = q.shift()!;

      for (let i = 0; i < this.dirX.length; i++) {
        let nextRow = vertice.row + this.dirX[i];
        let nextCol = vertice.col + this.dirY[i];

        if (nextRow < 0 || nextRow >= this.grid.length) continue;

        if (nextCol < 0 || nextCol >= this.grid[0].length) continue;

        if (this.visited[nextRow][nextCol]) continue;

        q.push({ row: nextRow, col: nextCol });
        this.q.push({ row: nextRow, col: nextCol });
        this.visited[nextRow][nextCol] = true;
      }
    }
  }

  startDFS(): void {
    this.dfs(20, 30);
    this.drawBoardIntervalId = setInterval(() => {
      this.changeVisited();
    }, 50);
  }

  startBFS(): void {
    this.clearGrid();
    this.bfs(20, 30);
    this.drawBoardIntervalId = setInterval(() => {
      this.changeVisited();
    }, 10);
  }

  changeVisited(): void {
    let i: cell;
    if (this.q.length > 0) {
      i = this.q.shift()!;
      this.data[this.gridDataValue[i.row][i.col]].visited = true;
    } else clearInterval(this.drawBoardIntervalId);
  }

  stop(): void {}

  clearGrid() {
    let i = [...this.dataDummy];
    this.data = i;
    this.visited = [...this.visitedDummy];
  }

  setStart(data:{row:number , col:number}){
    if(data.row == this.end.row && data.col == this.end.col)
      return;
    this.start = {row:data.row , col:data.col};
  }

  setEnd(data:{row:number , col: number}){
    if(data.row == this.start.row && data.col == this.start.col)
      return;
    this.end = {row:data.row , col: data.col};
  }

  ngOnInit(): void {}
  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    if (this.drawBoardIntervalId != undefined)
      clearInterval(this.drawBoardIntervalId);
  }
}
