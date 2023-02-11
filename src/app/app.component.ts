import {Component, ViewChild} from '@angular/core';
import {BoardComponent} from './board/board.component';
import {Algorithms} from "./Algorithms/Traversals/Traversal";

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

  onClear(): void {
    this.boardComponent.clearState();
  }
  onClearPath():void{
    this.boardComponent.clearPath();
  }
}
