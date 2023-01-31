import { Component, ChangeDetectionStrategy, ViewChild } from '@angular/core';
import { BoardComponent } from './board/board.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'graph-visualizer';

  @ViewChild(BoardComponent)
  private boardComponent!: BoardComponent;

  onDFS(): void {
    this.boardComponent.startDFS();
  }
  onBFS(): void {
    this.boardComponent.startBFS();
  }

  onClear(): void {
    this.boardComponent.clearGrid();
  }
}
