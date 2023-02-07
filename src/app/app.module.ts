import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BoardComponent } from './board/board.component';
import { NavbarComponent } from './navbar/navbar.component';
import { CellComponent } from './board/cell/cell.component';

import{FontAwesomeModule} from "@fortawesome/angular-fontawesome";

@NgModule({
  declarations: [AppComponent, BoardComponent, NavbarComponent, CellComponent],
  imports: [BrowserModule , FontAwesomeModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
