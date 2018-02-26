import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { Angular2TokenService } from 'angular2-token';
import { MaterializeModule, MaterializeDirective } from 'angular2-materialize';
import { NgxPaginationModule } from 'ngx-pagination';

import { AuthGuard } from './user/guards/user.guard'
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
import { CategoryService } from './shared/service/category.service';
import { CategoryItemComponent } from './category/category-list/category-item/category-item.component';
import { CategoryDetailComponent } from './category/category-detail/category-detail.component';
import { RegisterComponent } from './user/register/register.component';
import { ArtPipePipe } from './art/art-list/art-pipe.pipe';


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
    CategoryDetailComponent,
    RegisterComponent,
    ArtPipePipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    RoutesModule,
    MaterializeModule,
    HttpModule,
    NgxPaginationModule
  ],
  providers: [ArtService, CategoryService, Angular2TokenService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
