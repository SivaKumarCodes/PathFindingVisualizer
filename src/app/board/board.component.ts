import { Component, ElementRef, OnInit, Self } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

type cell = {
  row: number;
  col: number;
};

type cellData = {
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

  // sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

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

  // sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

  constructor(@Self() private el: ElementRef, private sanitizor: DomSanitizer) {
    this.boardRows = Math.floor((el.nativeElement.offsetHeight + 2) / 20);
    this.boardCols = Math.floor((el.nativeElement.offsetWidth + 2) / 20);

    this.fillGrid();
    this.clearGrid();
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
    this.q.push({ row: startCol, col: startCol });

    while (q.length > 0) {
      let vertice: cell = q.shift()!;

      for (let i = 0; i < this.dirX.length; i++) {
        let nextRow = vertice.row + this.dirX[i];
        let nextCol = vertice.col + this.dirY[i];

        if (nextRow < 0 || nextRow >= this.grid.length) continue;

        if (nextCol < 0 || nextCol >= this.grid[0].length) continue;

        if (this.visited[nextRow][nextCol]) continue;

        q.push({ row: nextRow, col: nextCol });
        this.visited[nextRow][nextCol] = true;
        this.data[this.gridDataValue[nextRow][nextCol]].visited = true;
      }
    }
  }

  startDFS(): void {
    this.dfs(0, 0);
    this.drawBoardIntervalId = setInterval(() => {
      this.changeVisited();
    }, 50);
  }

  startBFS(): void {}

  changeVisited(): void {
    let i: cell;
    if (this.q.length > 0) {
      i = this.q.shift()!;
      this.data[this.gridDataValue[i.row][i.col]].visited = true;
    } else clearInterval(this.drawBoardIntervalId);
  }

  clearGrid() {
    this.data = [...this.dataDummy];
    this.visited = [...this.visitedDummy];
  }

  ngOnInit(): void {}
  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    if (this.drawBoardIntervalId != undefined)
      clearInterval(this.drawBoardIntervalId);
  }
}
