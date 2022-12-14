import { Component, EventEmitter, Input, Output,OnInit } from '@angular/core';
import {  Router } from '@angular/router';
import { Contact } from '../../contacts-page/contacts-interface';
import { ContactsService } from '../../contacts.service';

@Component({
  selector: 'contacts-table',
  templateUrl: './contacts-table.component.html',
  styles: [
  ]
})
export class ContactsTableComponent {
  @Input() contacts: any = [];
  @Output() onDeleteContact = new EventEmitter();
  unsubscribeGetAll: Function = () => {};



  constructor(private CS: ContactsService, private router: Router
    ) {}

  deleteContact(e: MouseEvent, id: string) {
    e.stopPropagation();
    this.CS.delete(id);
    this.CS.getAll((contacts: Contact[]) => {
      this.contacts = contacts;
      this.onDeleteContact.emit(contacts);
    });
  }


  changeLeadStatus(e: MouseEvent,id:string,contact:Contact){
    this.contacts = this.CS.collectionRef
    e.stopPropagation();
    this.CS.editLeadStatus(id,contact,() => this.CS.getAll((contacts: Contact[]) => {
      this.contacts = contacts;
      this.router.navigate([''])
    }))
    }
    }
