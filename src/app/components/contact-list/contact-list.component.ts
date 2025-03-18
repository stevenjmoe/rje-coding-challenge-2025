import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Contact } from 'src/app/models/contact.model';
import { ContactService } from 'src/app/services/contact.service';
import { State, selectActiveContact, selectContactList } from '../../state';
import * as actions from '../../state/actions';


@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})
export class ContactListComponent {

  contactList$: Observable<Contact[]>;
  activeContact$: Observable<Contact | undefined>;

  constructor(
    private contactService: ContactService,
    private store: Store<State>
  ) {
    this.contactList$ = this.store.select(selectContactList)
    this.activeContact$ = this.store.select(selectActiveContact);
  }

  viewContactClicked(contactId: number) {
    this.store.dispatch(actions.contactSelected({ contactId }))
  }

  editContactClicked(contact: Contact) {
    this.store.dispatch(actions.editContactClicked({ contact }))
  }

  addContactClicked() {
    this.store.dispatch(actions.addContactClicked())
  }
}
