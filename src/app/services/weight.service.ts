import { Injectable, OnInit } from "@angular/core";
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument
} from "angularfire2/firestore";
import { Observable } from "rxjs/Observable";
import { Weight } from "../models/Weight";
import { AuthService} from "../services/auth.service";

@Injectable()
export class WeightService implements OnInit {
  weightsCollection: AngularFirestoreCollection<Weight>;
  weightDoc: AngularFirestoreDocument<Weight>;
  weights: Observable<Weight[]>;
  weight: Observable<Weight>;
  constructor(private afs: AngularFirestore, private authService: AuthService) {
    this.authService.getAuth().subscribe( auth => {
      this.weightsCollection = this.afs.collection("/users/" + auth.uid + "/weights/", ref =>
        ref.orderBy("date", "desc")
      );});
  }
  
  ngOnInit() {
  }

  getWeights(): Observable<Weight[]> {
   
      // Get weights with the id
      this.weights = this.weightsCollection.snapshotChanges().map(changes => {
        return changes.map(action => {
          const data = action.payload.doc.data() as Weight;
          data.id = action.payload.doc.id;
          return data;
        });
      });
   
    return this.weights;
  }
  newWeight(weight: Weight) {
    this.weightsCollection.add(weight);
  } 

  deleteWeight(id: string) {
    this.authService.getAuth().subscribe( auth => {
      this.weightDoc = this.afs.doc(`users/${auth.uid}/weights/${id}`);
      this.weightDoc.delete();
    });
  }
}
