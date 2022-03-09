import { Injectable } from '@angular/core';
import {
  Firestore,
  collection,
  collectionData,
  doc,
  docData,
  addDoc,
  deleteDoc,
  updateDoc,
  where
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';

export interface Note {
  id?: string;
  title: string;
  text: string;
}

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(
      private firestore: Firestore
  )
  {

  }

  getNotes(): Observable<any[]> {
    const notesRef = collection(this.firestore, 'notes');

    return collectionData(notesRef, { idField: 'id'}) as Observable<Note[]>;
  }
  get(table): Observable<any[]> {
    const notesRef = collection(this.firestore, table);
    // notesRef;
    return collectionData(notesRef, { idField: 'id'}) as Observable<Note[]>;
  }
  getwhere(table,k,v): Observable<any[]> {
    const notesRef = collection(this.firestore, table);
    // notesRef
    // notesRef;
    // @ts-ignore
    return collectionData(notesRef, { idField: 'id'},where(k, "==",  v)) as Observable<Note[]>;
  }

  getNoteById(id): Observable<Note> {
    const noteDocRef = doc(this.firestore, `notes/${id}`);
    return docData(noteDocRef, { idField: 'id' }) as Observable<Note>;
  }

  addNote(note: any) {
    const notesRef = collection(this.firestore, 'notes');
    return addDoc(notesRef, note);
  }

  add(data, table) {
    const notesRef = collection(this.firestore, table);
    return addDoc(notesRef, data);
  }

  deleteNote(table,id) {
    const noteDocRef = doc(this.firestore, table+`/${id}`);
    return deleteDoc(noteDocRef);
  }

  update(table,id,data) {
    const noteDocRef = doc(this.firestore, table+`/${id}`);
    return updateDoc(noteDocRef, data);
  }
}
