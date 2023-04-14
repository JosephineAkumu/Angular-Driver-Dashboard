import { Injectable } from '@angular/core'
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable, BehaviorSubject, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import { Driver } from 'src/app/interfaces/driver';

@Injectable({
    providedIn: 'root'
})
export class DriverService {
    private driversCollection: AngularFirestoreCollection<Driver[]>;
    private balanceDocument: AngularFirestoreDocument

    constructor(private afs: AngularFirestore) {

    }
    listAllDrivers(): Observable<any[]> {
        this.driversCollection = this.afs.collection('drivr').doc('Users').collection('Driver');
        return this.driversCollection.snapshotChanges().pipe(
            map(drivers => drivers.map(driver => {
                const data = driver.payload.doc.data();
                const id = driver.payload.doc.id;
                return { id, ...data };
            }))
        );
    }

    loadDriverPositions(): Observable<any[]> {
        this.driversCollection = this.afs.collection('drivr').doc('DriversAvailable').collection('DriversAvailable');
        return this.driversCollection.snapshotChanges().pipe(
            map(drivers => drivers.map(driver => {
                const data = driver.payload.doc.data();
                const id = driver.payload.doc.id;
                return { id, ...data };
            }))
        );
    }

    loadDriverBalance(driverId: string): Observable<any> {
        this.balanceDocument = this.afs.collection('drivr').doc('DriversAccount').collection(driverId).doc('Balance');
        return this.balanceDocument.valueChanges();

    }

    //load from firebase
}
