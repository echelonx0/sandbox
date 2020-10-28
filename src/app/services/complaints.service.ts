import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } 
from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Complaint } from '../models/complaint';

@Injectable({
  providedIn: 'root'
})

@Injectable()
export class ComplaintsService {
  complaintsCollection: AngularFirestoreCollection<Complaint>;
  complaintDoc: AngularFirestoreDocument<Complaint>;
  complaints: Observable<Complaint[]>;
  complaint: Observable<Complaint>;

  constructor(private afs: AngularFirestore) { 
    this.complaintsCollection = this.afs.collection('complaints', ref => ref.orderBy('datePosted', 'desc'));
  }

  getComplaints(): Observable<Complaint[]> {
    // Get clients with the id
    this.complaints = this.complaintsCollection.snapshotChanges().pipe(map(changes => {
      return changes.map(action => {
        const data = action.payload.doc.data() as Complaint;
        data.id = action.payload.doc.id;
        return data;
      });
    }));

    return this.complaints; 
  }


  
  newComplaint(complaint: Complaint) {
    this.complaintsCollection.add(complaint);
  }


  
  getComplaint(id: string): Observable<Complaint> {
    this.complaintDoc = this.afs.doc<Complaint>(`complaints/${id}`);
    this.complaint = this.complaintDoc.snapshotChanges().pipe(map(action => {
      if(action.payload.exists === false) {
        return null;
      } else {
        const data = action.payload.data() as Complaint;
        data.id = action.payload.id;
        return data;
      }
    }));

    return this.complaint;
  }



}