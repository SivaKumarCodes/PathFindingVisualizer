import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Algorithms} from "../Algorithms/Traversals/Traversal";
import {MazeEnum} from "../Algorithms/MazeGenerators/MazeGenerator";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {

  selectedAlogorithm !:Algorithms;
  selectedMaze!:MazeEnum;
  @Output() selectalgo:EventEmitter<Algorithms> = new EventEmitter();
  @Output() clear = new EventEmitter();
  @Output() clearpath = new EventEmitter();

  @Output() startmaze = new EventEmitter<MazeEnum>();

  @Output() start = new EventEmitter();

  algoOptions: string[] = [
    "Dijkstra's algorithm",
    'A* search algorithm',
    'Breadth first search',
    'Depth first search',
  ];

  mazeOptions: string[] = [
    "Binary Tree Maze",
  ]
  algoSelected!: string;
  algoVisible: boolean;

  mazeVisible:boolean;

  constructor() {
    this.algoVisible = false;
    this.mazeVisible = false;
  }

  setAlgoVisible(): void {
    this.algoVisible = !this.algoVisible;
    if(this.mazeVisible == true) this.mazeVisible = false;
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

  setMazeSelected(option:string){
    let res:string;

    switch (option){
      case this.mazeOptions[0]:
        this.selectedMaze = MazeEnum.BinaryTreeMaze;
        break;
    }
    this.startmaze.emit(this.selectedMaze);
  }

  setMazeVisible(){
    this.mazeVisible = !this.mazeVisible;
    if(this.algoVisible == true) this.algoVisible = false;
  }

  startVisulization(){
    this.start.emit();
    if(this.mazeVisible == true) this.mazeVisible = false;
    if(this.algoVisible == true) this.algoVisible = false;
  }
  ngOnInit(): void {}

  clearBoard(event:Event): void {
    event.preventDefault();
    if(this.mazeVisible == true) this.mazeVisible = false;
    if(this.algoVisible == true) this.algoVisible = false;
    this.clear.emit();
  }

  clearPath(event:Event):void{
    event.preventDefault();
    if(this.mazeVisible == true) this.mazeVisible = false;
    if(this.algoVisible == true) this.algoVisible = false;
    this.clearpath.emit();
  }

}
