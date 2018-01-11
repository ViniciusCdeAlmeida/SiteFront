import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import {FileUploader, FileSelectDirective} from 'ng2-file-upload';

import { MaterializeModule, MaterializeDirective } from 'angular2-materialize';
import {HttpModule} from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Angular2TokenService } from 'angular2-token';

import { AppComponent } from './app.component';
import { ArtComponent } from './art/art.component';
import { UserComponent } from './user/user.component';
import { CategoryComponent } from './category/category.component';
import { ArtEditComponent } from './art/art-edit/art-edit.component';
import { ArtListComponent } from './art/art-list/art-list.component';
import { CategoryEditComponent } from './category/category-edit/category-edit.component';
import { CategoryListComponent } from './category/category-list/category-list.component';
import { HeaderComponent } from './header/header.component';
import { LoginComponent } from './user/login/login.component';
import { ArtDetailComponent } from './art/art-detail/art-detail.component';
import { HomeComponent } from './home/home.component';
import { RoutesModule } from './shared/routes.module';
import { DropdownDirective } from './shared/dropdown.directive';
import { ArtItemComponent } from './art/art-list/art-item/art-item.component';
import { ArtService } from './shared/service/art.service';
import { StorageService } from './shared/service/storage.service';
import { CategoryService } from './category/category.service';
import { CategoryItemComponent } from './category/category-list/category-item/category-item.component';
import { CategorySelectComponent } from './category/category-list/category-select/category-select.component';


@NgModule({
  declarations: [
    AppComponent,
    ArtComponent,
    UserComponent,
    CategoryComponent,
    ArtEditComponent,
    ArtListComponent,
    CategoryEditComponent,
    CategoryListComponent,
    HeaderComponent,
    LoginComponent,
    ArtDetailComponent,
    HomeComponent,
    DropdownDirective,
    ArtItemComponent,
    CategoryItemComponent,
    CategorySelectComponent,
    FileSelectDirective
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    RoutesModule,MaterializeModule,
    HttpModule
    
  ],
  providers: [ArtService, /* StorageService, */ CategoryService, Angular2TokenService],
  bootstrap: [AppComponent]
})
export class AppModule { }
