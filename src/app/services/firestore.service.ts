import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root',
})
export class FirestoreService {
  constructor(public db: AngularFirestore) {}
  createDoc(data: any, path: string, id: string) {
    const collection = this.db.collection(path);
    return collection.doc(id).set(data);
  }

  getDoc(path: string, id: string) {
    const collection = this.db.collection(path);
    return collection.doc(id).valueChanges();
  }

  deleteDoc(path: string, id: string) {
    const collection = this.db.collection(path);
    return collection.doc(id).delete();
  }

  updateDoc(data: any, path: string, id: string) {
    const collection = this.db.collection(path);
    return collection.doc(id).update(data);
  }
}
