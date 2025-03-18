import { Injectable } from "@angular/core";
import { concatMap, map, switchMap } from 'rxjs';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import * as actions from './actions';
import { ContactService } from "../services/contact.service";


@Injectable()
export class ContactEffects {

  constructor(
    private actions$: Actions,
    private contactService: ContactService,
  ) { }

  retrieveContactList$ = createEffect(() => this.actions$.pipe(
    ofType(actions.appStarted),
    concatMap(() =>
      this.contactService.getContactList$().pipe(
        map(contactList => actions.contactListReturned({ contactList }))
      )
    )
  ))

  launchEditDialog$ = createEffect(() => this.actions$.pipe(
    ofType(actions.editContactClicked),
    switchMap(action =>
      this.contactService.editContactDialog$(action.contact).pipe(
        map(contact => contact ? actions.editContactConfrimed({ contact }) : actions.editContactCancelled())
      )
    )
  ))

  launchAddDialog$ = createEffect(() => this.actions$.pipe(
    ofType(actions.addContactClicked),
    switchMap(_action =>
      this.contactService.editContactDialog$(null).pipe(
        map(contact => contact ? actions.addContactConfirmed({ contact }) : actions.addContactCancelled())
      )
    )
  ))

  saveContact$ = createEffect(() => this.actions$.pipe(
    ofType(actions.editContactConfrimed),
    concatMap(action =>
      this.contactService.saveContact$(action.contact).pipe(
        map(contact => actions.contactSavedSuccess({ contact }))
      ),
    )
  ))

  saveNewContact$ = createEffect(() => this.actions$.pipe(
    ofType(actions.addContactConfirmed),
    concatMap(action =>
      this.contactService.saveContact$(action.contact).pipe(
        map(contact => actions.contactSavedSuccess({ contact }))
      ),
    ),
    concatMap(() =>
      this.contactService.getContactList$().pipe(
        map(contactList => actions.contactListReturned({ contactList }))
      ),
    ),
  ))
}
