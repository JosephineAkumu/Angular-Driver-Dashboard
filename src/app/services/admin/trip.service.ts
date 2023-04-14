import { Injectable } from '@angular/core'
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable, BehaviorSubject, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class TripService {
    private tripsCollection: AngularFirestoreCollection<any[]>;

    constructor(private afs: AngularFirestore) {

    }
    listAllTrips(): Observable<any[]> {
        this.tripsCollection = this.afs.collection('drivr').doc('TripData').collection('TripData');
        return this.tripsCollection.valueChanges();
        // return this.tripsCollection.snapshotChanges().pipe(
        //     map(trips => trips.map(a => {
        //         const data = a.payload.doc.data();
        //         const id = a.payload.doc.id;
        //         return { id, ...data };
        //     }))
        // );
    }

    listActiveTrips(): Observable<any[]> {
        this.tripsCollection = this.afs.collection('drivr').doc('DriversWorking').collection('Eco+');
        return this.tripsCollection.valueChanges();
    }

    loadTripsToday(): Observable<any[]> {
        var beginningDateObject = new Date(Date.now()).setHours(0, 0, 0, 0);
        this.tripsCollection = this.afs.collection('drivr').doc('TripData').collection('TripData', ref => ref
            .where('AcceptDate', '>', beginningDateObject));
        return this.tripsCollection.valueChanges();
    }

    //load from firebase
}
