import { NgModule } from '@angular/core';
import { Routes, RouterModule, CanActivate } from '@angular/router';
import {GameComponent} from './game/game.component';
import {GameStartComponent} from './game/game-start/game-start.component';
import {GameDetailComponent} from './game/game-detail/game-detail.component';
import {PublisherComponent} from './publisher/publisher.component';
import {PublisherStartComponent} from './publisher/publisher-start/publisher-start.component';
import {PublisherDetailComponent} from './publisher/publisher-detail/publisher-detail.component';
import {GameEditComponent} from './game/game-edit/game-edit.component';
import {PublisherEditComponent} from './publisher/publisher-edit/publisher-edit.component';

const appRoutes: Routes = [

  { path: '', redirectTo: '/games', pathMatch: 'full' },
  { path: 'publishers', component: PublisherComponent, children: [
      { path: '', component: PublisherStartComponent },
      { path: 'new', component: PublisherEditComponent },
      { path: ':id', component: PublisherDetailComponent },
      { path: ':id/edit', component: PublisherEditComponent }
    ] },
  { path: 'games', component: GameComponent, children: [
      { path: '', component: GameStartComponent },
      { path: 'new', component: GameEditComponent },
      { path: ':id', component: GameDetailComponent },
      { path: ':id/edit', component: GameEditComponent }
    ] }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
