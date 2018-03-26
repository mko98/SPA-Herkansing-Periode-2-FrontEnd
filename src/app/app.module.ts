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
  MAT_DATE_LOCALE,
  MatButtonModule, MatCheckboxModule, MatDatepicker, MatDatepickerModule, MatFormFieldModule, MatInputModule, MatNativeDateModule,
  MatSelectModule,
  MatTabsModule,
  MatToolbarModule
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
import {PublisherService} from './publisher/publisher.service';
import { PublisherEditComponent } from './publisher/publisher-edit/publisher-edit.component';
import { GamePublisherItemComponent } from './game/game-publisher-item/game-publisher-item.component';
import { PublisherGameItemComponent } from './publisher/publisher-game-item/publisher-game-item.component';
import {UserRegisterComponent} from './user/user-register/user-register.component';
import {UserComponent} from './user/user.component';
import {UserLoginComponent} from './user/user-login/user-login.component';
import {UserService} from './user/user.service';

@NgModule({
  declarations: [
    AppComponent,
    GameComponent,
    GameListComponent,
    GameDetailComponent,
    GameStartComponent,
    UserRegisterComponent,
    UserComponent,
    UserLoginComponent,
    HeaderComponent,
    PublisherComponent,
    PublisherDetailComponent,
    PublisherListComponent,
    PublisherStartComponent,
    GameItemComponent,
    PublisherItemComponent,
    GameEditComponent,
    PublisherEditComponent,
    GamePublisherItemComponent,
    PublisherGameItemComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatInputModule,
    MatTabsModule,
    MatCheckboxModule,
    MatToolbarModule,
    AppRoutingModule,
    MatFormFieldModule,
    MatSelectModule,
    BrowserAnimationsModule

  ],
  providers: [GameService, PublisherService, UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
