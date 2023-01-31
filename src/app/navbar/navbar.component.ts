import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  @Output() dfs = new EventEmitter();
  @Output() bfs = new EventEmitter();
  @Output() clear = new EventEmitter();

  constructor() {}

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
