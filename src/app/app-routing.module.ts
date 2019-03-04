import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {MessageComponentComponent} from './message-component/message-component.component';
import {ImageComponent} from './message/image-componet/image/image.component';

const routes: Routes = [
  { path: 'image', component: MessageComponentComponent},
  {path: '', component: ImageComponent}
];
@NgModule({
  imports: [CommonModule, RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
