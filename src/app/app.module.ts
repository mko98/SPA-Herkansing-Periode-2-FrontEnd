import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { GameComponent } from './game/game.component';
import { GameListComponent } from './game/game-list/game-list.component';
import { GameDetailComponent } from './game/game-detail/game-detail.component';
import { GameStartComponent } from './game/game-start/game-start.component';
import {AppRoutingModule} from './app-routing.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {
  MatButtonModule, MatCheckboxModule, MatFormField, MatFormFieldModule, MatSelectModule, MatTabsModule, MatToolbarModule,
  MatToolbarRow
} from '@angular/material';
import { HeaderComponent } from './header/header.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { PublisherComponent } from './publisher/publisher.component';
import { PublisherDetailComponent } from './publisher/publisher-detail/publisher-detail.component';
import { PublisherListComponent } from './publisher/publisher-list/publisher-list.component';
import { PublisherStartComponent } from './publisher/publisher-start/publisher-start.component';
import {GameService} from './game/game.service';
import { GameItemComponent } from './game/game-list/game-item/game-item.component';
import { PublisherItemComponent } from './publisher/publisher-list/publisher-item/publisher-item.component';
import { GameEditComponent } from './game/game-edit/game-edit.component';


@NgModule({
  declarations: [
    AppComponent,
    GameComponent,
    GameListComponent,
    GameDetailComponent,
    GameStartComponent,
    HeaderComponent,
    PublisherComponent,
    PublisherDetailComponent,
    PublisherListComponent,
    PublisherStartComponent,
    GameItemComponent,
    PublisherItemComponent,
    GameEditComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    MatButtonModule,
    MatTabsModule,
    MatCheckboxModule,
    MatToolbarModule,
    AppRoutingModule,
    MatFormFieldModule,
    MatSelectModule,
    BrowserAnimationsModule

  ],
  providers: [GameService],
  bootstrap: [AppComponent]
})
export class AppModule { }
