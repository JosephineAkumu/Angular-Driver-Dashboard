import { Injectable } from '@angular/core'
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class PlacesService {
    private placesCollection: AngularFirestoreCollection<any[]>;

    constructor(private afs: AngularFirestore,
        private http: HttpClient) {
    }

    listPopularPlaces(): Observable<any[]> {
        this.placesCollection = this.afs.collection('drivr').doc('Places').collection('Popular');
        // return this.itemsCollection.valueChanges();
        return this.placesCollection.snapshotChanges().pipe(
            map(actions => actions.map(a => {
                const data = a.payload.doc.data();
                const id = a.payload.doc.id;
                return { id, ...data };
            }))
        );
    }

    addPopularPlaces(placeData: object) {
        this.afs.collection('drivr').doc('Places').collection('Popular').add(placeData);
    }

    listCounties() {
        return COUNTIES;
    }
}

const COUNTIES = [
    "Kenya",
    "Baringo County",
    "Bomet County",
    "Bungoma County",
    "Busia County",
    "Elgeyo-Marakwet County",
    "Embu County",
    "Garissa County",
    "Homa Bay County",
    "Isiolo County",
    "Kajiado County",
    "Kakamega County",
    "Kericho County",
    "Kiambu County",
    "Kilifi County",
    "Kirinyaga County",
    "Kisii County",
    "Kisumu County",
    "Kitui County",
    "Kwale County",
    "Laikipia County",
    "Lamu County",
    "Machakos County",
    "Makueni County",
    "Mandera County",
    "Marsabit County",
    "Meru County",
    "Migori County",
    "Mombasa County",
    "Murang'a County",
    "Nairobi County",
    "Nakuru County",
    "Nandi County",
    "Narok County",
    "Nyamira County",
    "Nyandarua County",
    "Nyeri County",
    "Samburu County",
    "Siaya County",
    "Taita-Taveta County",
    "Tana River County",
    "Tharaka-Nithi County",
    "Trans-Nzoia County",
    "Turkana County",
    "Uasin Gishu County",
    "Vihiga County",
    "Wajir County",
    "West Pokot County",
]
