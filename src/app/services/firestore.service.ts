import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class FirestoreService {
  constructor(public db: AngularFirestore) {}

  async createDoc(data: any, path: string, id: string): Promise<void> {
    try {
      const collection = this.db.collection(path);
      await collection.doc(id).set(data);
    } catch (error) {
      console.error('Error creating document: ', error);
      throw error;
    }
  }

  getDoc(path: string, id: string) {
    const collection = this.db.collection(path);
    return collection.doc(id).valueChanges();
  }

  async deleteDoc(path: string, id: string): Promise<void> {
    try {
      const collection = this.db.collection(path);
      await collection.doc(id).delete();
    } catch (error) {
      console.error('Error deleting document: ', error);
      throw error;
    }
  }

  async updateDoc(data: any, path: string, id: string): Promise<void> {
    try {
      const collection = this.db.collection(path);
      await collection.doc(id).update(data);
    } catch (error) {
      console.error('Error updating document: ', error);
      throw error;
    }
  }

  getCollection<T>(path: string) {
    const ref = this.db.collection<T>(path);
    return ref.valueChanges();
  }

  getCollectionWithId<T>(path: string) {
    const ref = this.db.collection(path);
    return ref.snapshotChanges().pipe(
      map((actions) =>
        actions.map((a) => {
          const data = a.payload.doc.data() as T;
          const id = a.payload.doc.id;
          return { id, ...data };
        })
      )
    );
  }

  async docExists(path: string, id: string): Promise<boolean> {
    try {
      const doc = await this.db.collection(path).doc(id).get().toPromise();
      return doc!.exists;
    } catch (error) {
      console.error("Error checking document existence: ", error);
      throw error;
    }
  }

  docExists_(path: string, id: string): Observable<boolean> {
    const doc = this.db.collection(path).doc(id).snapshotChanges();
    return doc.pipe(
      map(action => action.payload.exists)
    );
  }
}
