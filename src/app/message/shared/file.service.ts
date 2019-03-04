import { Injectable } from '@angular/core';
import {AngularFireStorage} from '@angular/fire/storage';
import {FileMetadata} from '../entities/FileMetadata';
import {Observable} from 'rxjs/internal/Observable';
import {from} from 'rxjs/internal/observable/from';
import {AngularFirestore} from '@angular/fire/firestore';
import {map, switchMap} from 'rxjs/operators';
import {defer} from 'q';
import {Image} from '../entities/Image';

@Injectable()
export class FileService {


  constructor(private storage: AngularFireStorage,
              private db: AngularFirestore) { }

  upload(file: File): Observable<FileMetadata> {
  /*  this.storage.ref('product-pictures/' + file.name)
      .put(file)
      .then(() => {

      });
    return Observable.create();*/
  return this.createFileMetaData(
    {
      type: file.type,
      name: file.name,
      lastChanged: file.lastModified,
      size: file.size

    }
    ).pipe(
      switchMap(metaDataWithId => {
       return this.storage
         .ref('product-pictures/' + metaDataWithId.id)
         .put(file).
         snapshotChanges()
         .pipe(
           map(() => {

             return metaDataWithId;
           })
         );
      }));
  }

createFileMetaData(metadata: FileMetadata)
: Observable<FileMetadata> {
    return from(
      this.db.collection('files')
      .add(metadata))
    .pipe(
    map(metaRef => {
      metadata.id = metaRef.id;
      return metadata;
    }));

}
getFileUrl(id: string): Observable<any> {
   return this.storage.ref('product-pictures/' + id)
      .getDownloadURL();
  }

  addImage(imageData: Image) {
    const messageCollection = this.db.collection<Image>('images');
    return messageCollection.add(imageData);
  }

  getAllProduct(): Observable<any> {
   return this.db.collection('images').valueChanges();
  }
}
