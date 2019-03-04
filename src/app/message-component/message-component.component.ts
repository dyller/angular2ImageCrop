import {Component, OnDestroy, OnInit} from '@angular/core';
import {Observable} from 'rxjs/internal/Observable';
import {MessageService} from '../message/shared/message.service';
import {Subscribable, Unsubscribable} from 'rxjs/internal/types';
import {FormControl, FormGroup} from '@angular/forms';
import {FileService} from '../message/shared/file.service';
import {FileMetadata} from '../message/entities/FileMetadata';
import {switchMap} from 'rxjs/operators';
import {Image} from '../message/entities/Image';

@Component({
  selector: 'app-message-component',
  templateUrl: './message-component.component.html',
  styleUrls: ['./message-component.component.scss']
})
export class MessageComponentComponent implements  OnInit {
  title = 'Morse App';
  images: any[];
  messages: any[];
  fileToUpload: File;
  messagesPaged: Observable<any[]>;
  latest: any;
  message = '';
  humanReadableMessage = '';
  time: number;
  productFormGroup: FormGroup;
  name = new FormControl('');
  constructor(private messageService: MessageService,
              private fs: FileService) {
    this.productFormGroup = new FormGroup({
      name: new FormControl(''),
      dinko: new FormControl('')
    });
    this.messageService.getMessagesLastByLimit(5).subscribe(messages => {
      this.messagesPaged = messages;
      this.messages = messages;
      this.messages.sort((a, b) => this.convertMessage(a.message).localeCompare(this.convertMessage(b.message)));
      this.latest = messages[0];
    });
  }

  convertMessage(message: string): string {

    return this.messageService.convertToText(message);
  }

  send() {

    const time = new Date();
    const messageTextField = this.name.value;

   /* if(messageTextField != null )
    {
      this.messageService.addMessageButConvertBefore(time, messageTextField.trim().toUpperCase()).then(done => {
        console.log('saved');
      }, err => {
        console.log(err);
      });
    }
 else
    {*/
      this.messageService.addMessage(time, this.message.trim()).then(done => {
        console.log('saved');
      }, err => {
        console.log(err);
      });
    //}
    this.clear();
  }

  morse(active) {
    if (active) {
      this.time = (new Date()).getTime();
    } else {
      const clickTime = (new Date()).getTime() - this.time;
      if (clickTime > 120) {
        this.message += '-';
      } else {
        this.message += '.';
      }
      this.time = -1;
    }
  }

  space() {
    this.message += '/';
    this.humanReadableMessage = this.messageService.convertToText(this.message);
  }

  next() {
    this.message += ' ';
    this.humanReadableMessage = this.messageService.convertToText(this.message);
  }

  clear() {
    this.name.setValue('');
    this.message = '';
    this.humanReadableMessage = '';
  }


  nextPage() {
    this.messageService.getMessagesPaged(5, this.messagesPaged[this.messages.length - 1]).subscribe(messages => {
      this.messagesPaged = messages;
      this.messages = messages;
      this.messages.sort((a, b) => this.convertMessage(a.message).localeCompare(this.convertMessage(b.message)));
      this.latest = messages[0];
    });
  }

  privious() {
    this.messageService.getMessagesPagedBack(5, this.messagesPaged[0]).subscribe(messages => {
      this.messagesPaged = messages;
      this.messages = messages;
      this.messages.sort((a, b) => this.convertMessage(a.message).localeCompare(this.convertMessage(b.message)));
      this.latest = messages[0];
    });
  }
  uploadFile(event) {
    this.fileToUpload = event.target.files[0];
    //this.fs.upload(file).subscribe();
  }

  ngOnInit() {
    console.log("hey");
  /*this.fs.getFileUrls().
  subscribe( url => {
    console.log('hey');

    this.images = url;
  });*/
  }
}
