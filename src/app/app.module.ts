import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from "@angular/flex-layout";

import { AppComponent } from './app.component';
import { FilterServerPipe } from './pipes/filter-server.pipe';
import { FilterSelectionPipe } from './pipes/filter-selection.pipe';

import { MaterialModule } from './material/material.module';
import { AddServerComponent } from './components/add-server/add-server.component';
import { ConfirmationDialogComponent } from './components/confirmation-dialog/confirmation-dialog.component';
import { NotificationComponent } from './components/notification/notification.component';

@NgModule({
  declarations: [
    FilterServerPipe,
    FilterSelectionPipe,
    AppComponent,
    AddServerComponent,
    ConfirmationDialogComponent,
    NotificationComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    MaterialModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
