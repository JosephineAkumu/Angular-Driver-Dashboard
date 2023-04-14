import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable, BehaviorSubject, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BusinessService {
  url: string = "https://guarded-cove-99617.herokuapp.com/"
  // https://guarded-cove-99617.herokuapp.com/
  private itemsCollection: AngularFirestoreCollection<any>;

  constructor(
    private httpClient: HttpClient,
    private afs: AngularFirestore) { }


  testData(): Observable<any[]> {
    this.itemsCollection = this.afs.collection<any>('data');
    // return this.itemsCollection.valueChanges();
    return this.itemsCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data();
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );
  }

  countTotalTrips() {

  }


  // this.items = this.itemsCollection.valueChanges();
  // db.collection("cities").doc("SF")
  // .onSnapshot(function(doc) {
  //     // console.log("Current data: ", doc.data());
  // });
}
