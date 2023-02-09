import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Algorithms} from "../Algorithms/Traversals/Traversal";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {

  selectedAlogorithm !:Algorithms;
  @Output() selectalgo:EventEmitter<Algorithms> = new EventEmitter();
  @Output() clear = new EventEmitter();

  @Output() start = new EventEmitter();

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

  setAlgoVisible(): void {
    this.algoVisible = !this.algoVisible;
  }

  setAlgoSelected(option: string) {
    let res: string;

    switch (option) {
      case this.algoOptions[0]:
        res = "dijkstra's" + '!';
        this.selectedAlogorithm = Algorithms.DJIKTRAS;
        break;
      case this.algoOptions[1]:
        res = 'A*' + '!';
        this.selectedAlogorithm = Algorithms.ASTAR;
        break;
      case this.algoOptions[2]:
        res = 'BFS' + '!';
        this.selectedAlogorithm = Algorithms.BFS;
        break;
      case this.algoOptions[3]:
        res = 'DFS' + '!';
        this.selectedAlogorithm = Algorithms.DFS;
        break;
      default:
        res = '';
    }

    this.selectalgo.emit(this.selectedAlogorithm);
    this.algoSelected = res;

  }

  startVisulization(){
    this.start.emit();
  }
  ngOnInit(): void {}



  clearBoard(event:Event): void {
    event.preventDefault();
    this.clear.emit();
  }
}
