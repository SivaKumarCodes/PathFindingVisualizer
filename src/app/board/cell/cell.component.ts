import {Component,EventEmitter, Input, OnInit, Output} from '@angular/core';
import{cell} from "../board.component";

@Component({
  selector: 'app-cell',
  templateUrl: './cell.component.html',
  styleUrls: ['./cell.component.css'],
})
export class CellComponent implements OnInit {
  @Output() changeStart = new EventEmitter<cell>();
  @Output() changeEnd = new EventEmitter<cell>();

  @Output() draw = new EventEmitter<cell>();

  @Output() weight = new EventEmitter();

  @Output() noWeight = new EventEmitter();

  @Output() visborder :EventEmitter<void> = new EventEmitter();
  @Input() visited!: boolean;

  @Input() isInPath!:boolean;
  @Input() isStart!:boolean;
  @Input() isEnd!:boolean;
  @Input() row !: number;
  @Input() col !: number;
  @Input() isWall!:boolean;

  constructor() {}

  dragStart(event:any):void{
    event.stopPropagation();
    event.cancelBubble = true;
    let ghost = new Image();
    if(this.isStart) {
      ghost.src = "/assets/img/svg/start.svg"
      event.dataTransfer.setData("text" , "start");
    }
    else if(this.isEnd){
      ghost.src = "/assets/img/svg/end.svg"
      event.dataTransfer.setData("text" , "end");
    }
    event.dataTransfer.setDragImage(ghost,15 , 15 );
  }
  dragEnter(event:any):void{
    event.preventDefault();
    event.stopPropagation();
    event.cancelBubble = true;
    event.target.classList.add("hover");
  }
  dragLeave(event:any):void{
    event.preventDefault();
    event.stopPropagation();
    event.cancelBubble = true;
    event.target.classList.remove("hover");
  }

  drop(event:any):void{
    event.preventDefault();
    event.stopPropagation();
    event.cancelBubble = true;
    event.target.classList.remove("hover");
    if(event.dataTransfer.getData("text") === 'start')
    this.changeStart.emit({row:this.row,col:this.col});
    else if(event.dataTransfer.getData("text") === 'end')
      this.changeEnd.emit({row: this.row , col : this.col })
  }

  onMouseDown(event:MouseEvent):void{
    event.stopPropagation();
    event.cancelBubble = true;
    if(event.button == 0 && (!this.isStart && !this.isEnd))
      this.weight.emit();
  }


  onMouseUp(event:MouseEvent):void{
    event.preventDefault();
    event.cancelBubble = true;
    if(event.button == 0 && !this.isStart && !this.isStart )
      this.noWeight.emit();
  }

  mouseEnter(event:any):void{
    event.preventDefault();
    event.cancelBubble = true;
    if(!this.isStart && !this.isEnd)
    this.draw.emit({row : this.row , col : this.col});
  }

  dragOver(event:any){
    event.preventDefault();
    event.stopPropagation();
    event.cancelBubble = true;
  }

  dragEnd(event:any){
    event.preventDefault();
    event.stopPropagation();
    event.cancelBubble = true;
  }

  ngOnInit(): void {
  }
}
