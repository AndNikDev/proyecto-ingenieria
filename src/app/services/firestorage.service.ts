import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Injectable, Inject } from '@angular/core';
import { finalize } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FirestorageService {
  constructor(
    @Inject(AngularFireStorage) public fireStorage: AngularFireStorage
  ) {}

  uploadImage(file: any, path: string, nombre: string): Promise<string> {
    return new Promise((resolve) => {
      const filePath = `${path}/${nombre}`;
      const ref = this.fireStorage.ref(filePath);
      const task = ref.put(file);
      task
        .snapshotChanges()
        .pipe(
          finalize(() => {
            ref.getDownloadURL().subscribe((res) => {
              const downloadURL = res;
              resolve(downloadURL);
            });
          })
        )
        .subscribe();
    });
  }
}
