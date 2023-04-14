import { Injectable } from '@angular/core'
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable, BehaviorSubject, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class FareService {
    private fareCollection: AngularFirestoreCollection<any[]>;
    private fareDocument: AngularFirestoreDocument<any>;

    constructor(private afs: AngularFirestore) {

    }
    listAllFares(): Observable<any[]> {
        this.fareCollection = this.afs.collection('drivr').doc('Fare').collection('Zoom');
        return this.fareCollection.snapshotChanges().pipe(
            map(actions => actions.map(a => {
                const data = a.payload.doc.data();
                const id = a.payload.doc.id;
                return { id, ...data };
            }))
        );
        // return this.fareCollection.valueChanges();
    }

    updateFare(documentName: string, objectKey: string, objectValue: string):  Observable<any> {
        let fareDocument = this.afs.collection('drivr').doc('Fare').collection('Zoom').doc(documentName);
        var key = objectKey;
        var updateObject = {};
        updateObject[key] = objectValue;
        fareDocument.update(updateObject);

        return fareDocument.valueChanges();
    }
}
