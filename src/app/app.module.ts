import { TasksService } from './services/tasks.service';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SummaryPipe } from './summary.pipe';
import { DragDropModule } from '@angular/cdk/drag-drop';

import { HttpClientModule } from '@angular/common/http';
import { TasksComponent } from './components/tasks/tasks.component';

@NgModule({
  declarations: [AppComponent, SummaryPipe, TasksComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    DragDropModule,
    HttpClientModule,
  ],
  providers: [TasksService],
  bootstrap: [AppComponent],
})
export class AppModule {}
