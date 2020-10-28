import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

import { FormBuilder } from '@angular/forms';
import { Validators } from '@angular/forms';
import { FormArray } from '@angular/forms';


import {
  AngularFireStorage,
  AngularFireStorageReference,
  AngularFireUploadTask,
} from '@angular/fire/storage';
import { Observable } from 'rxjs';

import { finalize } from 'rxjs/operators';

import { Router } from '@angular/router';

import { FlashMessagesService } from 'angular2-flash-messages';
import { Complaint, FirestoreTimestamp } from 'src/app/models/complaint';
import { ComplaintsService } from 'src/app/services/complaints.service';

import * as firebase from 'firebase';

@Component({
  selector: 'app-complaint',
  templateUrl: './complaint.component.html',
  styleUrls: ['./complaint.component.css']
})
export class ComplaintComponent implements OnInit {

  complaintReference: string;
  ref: AngularFireStorageReference;
  task: AngularFireUploadTask;
  uploadState: Observable<string>;
  uploadProgress: Observable<number>;
  getDownloadURL: Observable<string>;
  downloadURL: Observable<any>;
  image: any;

  sex = [{'id':1, 'name':'Male'}, {'id':2, 'name': 'Female'}, {'id':3, 'name': 'Prefer not to say'}];

  constructor(
    public complaintsService: ComplaintsService,
    private afStorage: AngularFireStorage,
    private router: Router,
    private fb: FormBuilder,
    // private flashMessage: FlashMessagesService
  ) {}

  ngOnInit(): void {
    this.generateRandom;
    
  }

  uploadImage(event) {
    const file = event.target.files[0];
    const path = `posts/${file.name}`;
    if (file.type.split('/')[0] !== 'image') {
      return alert('only image files');
    } else {
      const task = this.afStorage.upload(path, file);
      const ref = this.afStorage.ref(path);
      this.uploadProgress = task.percentageChanges();
      console.log('Image uploaded!');
      task
        .snapshotChanges()
        .pipe(
          finalize(() => {
            this.downloadURL = ref.getDownloadURL();
            this.downloadURL.subscribe((url) => (this.image = url));
          })
        )
        .subscribe();
    }
  }

  //Trouble starts here

  theComplaint = this.fb.group({
    id: '',
    firstName: '',
    lastName: '',
    email: '',
    city: '',
    state: '',
    phoneNumber: 0,
    gender: '',
    picture: '',
    isVerified: false,
    complaint: '',
    age: 0,
    hospital: '',
    category: '',
    identification: '',
    documents: [],
    datePosted: firebase.firestore.FieldValue.serverTimestamp() as FirestoreTimestamp,

  });

  //Getting the array for documents
  get supportingDocuments() {
    return this.theComplaint.get('documents') as FormArray;
  }

  get imageUploader() {
    return this.theComplaint.get('images') as FormArray;
  }

  //Adding the object onto the array

  addTag() {
    this.supportingDocuments.push(this.fb.control(''));
  }

  addExtraImage() {
    this.imageUploader.push(this.fb.control(''));
  }

  //this should generate a random ID for the complaint
  generateRandom() {
    var number = Math.floor(Math.random() * 129000);
    var logReference = "NGHRA" + number;
    this.complaintReference = logReference;
  }

  onSubmit() {
    // TODO: Use EventEmitter with form value
    // console.warn(this.myProperty.value);

    this.complaintsService.newComplaint(this.theComplaint.value);
    this.theComplaint.reset();

  //  // this.router.navigate(['/info']);

  //  this.flashMessage.show('Sucessfully Posted', {
  //   cssClass: 'alert-success', timeout: 4000
  // });
  }
}