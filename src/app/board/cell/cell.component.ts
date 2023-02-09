import {Component,EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-cell',
  templateUrl: './cell.component.html',
  styleUrls: ['./cell.component.css'],
})
export class CellComponent implements OnInit {
  @Output() changeStart = new EventEmitter<{row : number, col : number}>();
  @Output() changeEnd = new EventEmitter<{row : number , col : number}>();

  @Output() visborder :EventEmitter<void> = new EventEmitter();
  @Input() visited!: boolean;

  @Input() isInPath!:boolean;
  @Input() isStart!:boolean;
  @Input() isEnd!:boolean;
  @Input() row !: number;
  @Input() col !: number;

  constructor() {}
  dragStart(event:any):void{
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
    event.target.classList.add("hover");
  }
  dragLeave(event:any):void{
    event.preventDefault();
    event.target.classList.remove("hover");
  }

  drop(event:any):void{
    event.preventDefault();
    event.target.classList.remove("hover");
    if(event.dataTransfer.getData("text") === 'start')
    this.changeStart.emit({row:this.row,col:this.col});
    else if(event.dataTransfer.getData("text") === 'end')
      this.changeEnd.emit({row: this.row , col : this.col })
  }

  dragOver(event:any){
    event.preventDefault();
  }

  dragEnd(event:any){
    event.preventDefault();
  }

  ngOnInit(): void {}
}
