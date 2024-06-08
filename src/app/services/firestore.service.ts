import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { map } from 'rxjs/operators';

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
    const doc = await this.db.collection(path).doc(id).get().toPromise();
    return doc?.exists ?? false;
  }
}
