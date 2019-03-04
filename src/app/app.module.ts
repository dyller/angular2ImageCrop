import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { environment } from '../environments/environment';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { MomentModule } from 'angular2-moment';
import {MessageService} from './message/shared/message.service';
import {AngularFireModule} from '@angular/fire';
import {AngularFirestoreModule} from '@angular/fire/firestore';
import { MessageComponentComponent } from './message-component/message-component.component';
import { AppRoutingModule } from './app-routing.module';
import {FileService} from './message/shared/file.service';
import {AngularFireStorageModule} from '@angular/fire/storage';
import { ImageComponent } from './message/image-componet/image/image.component';
import {ImageCropperComponent, ImageCropperModule} from 'ngx-image-cropper';

@NgModule({
  declarations: [
    AppComponent,
    MessageComponentComponent,
    ImageComponent
  ],
  imports: [
    ReactiveFormsModule,
    BrowserModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule, // imports firebase/firestore, only needed for database features
    MomentModule,
    AppRoutingModule,
    AngularFireStorageModule,
    ImageCropperModule
  ],
  providers: [
    FileService,
    MessageService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
