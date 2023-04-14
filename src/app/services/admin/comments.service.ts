import { Injectable } from '@angular/core'
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable, BehaviorSubject, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class CommentsService {
    private commentsCollection: AngularFirestoreCollection<any[]>;

    constructor(private afs: AngularFirestore) {

    }
    listDriverComments(driverId: string): Observable<any[]> {
        this.commentsCollection = this.afs.collection('drivr').doc('CustomerComments').collection(driverId);
        return this.commentsCollection.valueChanges();
    }

}
