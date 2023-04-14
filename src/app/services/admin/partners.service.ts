import { Injectable } from '@angular/core'
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class PartnersService {
    private partnersCollection: AngularFirestoreCollection<any[]>;

    constructor(private afs: AngularFirestore) {
    }

    listAllPartners(partner: string): Observable<any[]> {
        this.partnersCollection = this.afs.collection('drivr').doc('Partners').collection(partner);
        // return this.itemsCollection.valueChanges();
        return this.partnersCollection.snapshotChanges().pipe(
            map(actions => actions.map(a => {
                const data = a.payload.doc.data();
                const id = a.payload.doc.id;
                return { id, ...data };
            }))
        );
    }
}
