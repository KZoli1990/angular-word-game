import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddComponent } from './add/add.component';
import { GameComponent } from './game/game.component';

const routes: Routes = [
  {path:'', redirectTo:'add', pathMatch:'full'},
  {path:'add', component:AddComponent},
  {path:'game', component:GameComponent},
  {path:'**', redirectTo:'add', pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
