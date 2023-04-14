import { Injectable } from '@angular/core'
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class PassengerService {
    private passengersCollection: AngularFirestoreCollection<any[]>;
    private customerDocument: AngularFirestoreCollection<any[]>;

    constructor(private afs: AngularFirestore) {
    }

    listAllPassengers(): Observable<any[]> {
        this.passengersCollection = this.afs.collection('drivr').doc('Users').collection('Customer');
        // return this.itemsCollection.valueChanges();
        return this.passengersCollection.snapshotChanges().pipe(
            map(actions => actions.map(a => {
                const data = a.payload.doc.data();
                const id = a.payload.doc.id;
                return { id, ...data };
            }))
        );
    }
}
