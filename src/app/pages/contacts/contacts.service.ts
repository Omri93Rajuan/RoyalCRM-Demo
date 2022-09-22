import { Injectable, OnInit } from '@angular/core';
import { updateCurrentUser } from '@angular/fire/auth';
import {
  addDoc,
  collection,
  CollectionReference,
  deleteDoc,
  doc,
  DocumentData,
  Firestore,
  getDoc,
  onSnapshot,
  serverTimestamp,
  updateDoc,
  setDoc
} from '@angular/fire/firestore';
import { async } from '@firebase/util';
import { concat, timestamp } from 'rxjs';
import { Contact } from './contacts-page/contacts-interface';

@Injectable({
  providedIn: 'root',
})
export class ContactsService {
  leads : any = []
  private test : any = {}
   contacts: Contact[] = [
    {
      _id: '1',
      firstName: 'omri',
      lastName: 'rajuan',
      email: 'omri93rajuan@gmail.com',
      birthday: new Date('9/12/1993'),
      phone: '054-3334767',
      address: {
        state:"dssd",
        country: 'Israel',
        city: 'Elad',
        houseNumber: 33,
        zip: 45000,
        street: 'rabi yossi ben kisma',
      },
      notes: '',
      lead:false
    },
    {
      _id: '2',
      firstName: 'ishi',
      lastName: 'rajuan',
      email: 'ishi15rajuan@gmail.com',
      birthday: new Date('9/12/2014'),
      phone: '03-5084564',
      address: {
        state:"assad",
        country: 'Israel',
        city: 'Elad',
        houseNumber: 33,
        zip: 45000,
        street: 'rabi yossi ben kisma',
      },
      notes: 'A generally reliable contact',
      lead:false

    },
  ];

  collectionRef: CollectionReference<DocumentData> = collection(
    this.FS,
    'contacts'
  );


  getAll() {
    let contacts: any = [];
     onSnapshot(this.collectionRef, snapShotData => {
      snapShotData.docs.forEach(contact => {
        contacts.push({ ...contact.data(), _id: contact.id });
        
      }) 
    });
    
    return contacts;
  }




  
  constructor(private FS: Firestore) {}

  
  add(contact: Contact, cb: Function) {
    contact.createdAt = new Date;
    contact.lead = false
  addDoc(this.collectionRef,contact )
      .then(() => cb()) 
      .catch((error) => console.log(error));
      
  }

  delete(id: string) {
    const docRef = doc(this.FS, 'contacts', id);
    deleteDoc(docRef).catch((error) => console.log(error));
  }

 

  async getContact(id: string, cb: Function) {
    try {
      const docRef = doc(this.FS, 'contacts', id);
      const result = await getDoc(docRef);
      const contact = { ...result.data(), _id: result.id };
      cb(contact);
    } catch (error) {
      console.log(error);
    }
  }
  edit(contact: Contact, id: string, cb: Function) {
    const docRef = doc(this.FS, 'contacts', id);
    updateDoc(docRef, { ...contact })
      .then(() => cb())
      .catch((error) => console.log(error));
  }

 
}
