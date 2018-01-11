
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from '../app.component';
import { ArtComponent } from '../art/art.component';
import { UserComponent } from '../user/user.component';
import { CategoryComponent } from '../category/category.component';
import { ArtEditComponent } from '../art/art-edit/art-edit.component';
import { ArtListComponent } from '../art/art-list/art-list.component';
import { CategoryEditComponent } from '../category/category-edit/category-edit.component';
import { CategoryListComponent } from '../category/category-list/category-list.component';
import { HeaderComponent } from '../header/header.component';
import { LoginComponent } from '../user/login/login.component';
import { ArtDetailComponent } from '../art/art-detail/art-detail.component';
import { HomeComponent } from '../home/home.component';

// import {AuthGuard} from "./auth/guards/auth.guard";

const appRoutes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent},
  { path: 'art/list', component: ArtListComponent},
  { path: 'category', component: CategoryListComponent},
  { path: 'login', component: LoginComponent /* ,canActivate: [AuthGuard], */},
  { path: 'art', component: ArtComponent, /* canActivate: [AuthGuard], */ 
  children: [
    { path: 'new', component: ArtEditComponent },
    { path: ':id', component: ArtDetailComponent },
    { path: ':id/edit', component: ArtEditComponent },
  ] 
},
  { path: 'category', component: CategoryComponent, /* canActivate: [AuthGuard], */ 
children: [
    { path: 'new', component: CategoryEditComponent },
    { path: ':id/edit', component: CategoryEditComponent },
  ] 
},
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class RoutesModule {

}
