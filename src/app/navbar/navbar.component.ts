import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  @Output() dfs = new EventEmitter();
  @Output() bfs = new EventEmitter();
  @Output() clear = new EventEmitter();

  algoOptions: string[] = [
    "Dijkstra's algorithm",
    'A* search algorithm',
    'Breadth first search',
    'Depth first search',
  ];
  algoSelected!: string;
  algoVisible: boolean;

  constructor() {
    this.algoVisible = false;
  }

  setAlgoVisible(e: Event): void {
    e.preventDefault();
    e.stopPropagation();
    this.algoVisible = !this.algoVisible;
  }

  setAlgoSelected(option: string) {
    // this.algoSelected = option;
    let res: string;

    switch (option) {
      case this.algoOptions[0]:
        res = "dijkstra's" + '!';
        break;
      case this.algoOptions[1]:
        res = 'A*' + '!';
        break;
      case this.algoOptions[2]:
        res = 'BFS' + '!';
        break;
      case this.algoOptions[3]:
        res = 'DFS' + '!';
        break;
      default:
        res = '';
    }

    this.algoSelected = res;
  }

  ngOnInit(): void {}

  dfsStart(): void {
    this.dfs.emit();
  }
  bfsStart(): void {
    this.bfs.emit();
  }
  clearBoard(): void {
    this.clear.emit();
  }
}
