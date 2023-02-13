import {Component, ViewChild} from '@angular/core';
import {BoardComponent} from './board/board.component';
import {Algorithms} from "./Algorithms/Traversals/Traversal";
import {MazeEnum} from "./Algorithms/MazeGenerators/MazeGenerator";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'pathFinding-visualizer';

  @ViewChild(BoardComponent)
  private boardComponent!: BoardComponent;

  onAlgoSelection(algo:Algorithms):void{
    this.boardComponent.selectAlgorithm(algo);
  }

  onStart(){
    this.boardComponent.startTraversal();
  }

  onStartMaze(maze:MazeEnum){
    this.boardComponent.selectMaze(maze);
  }

  onClear(): void {
    this.boardComponent.clearState();
  }
  onClearPath():void{
    this.boardComponent.clearPath();
  }
}
