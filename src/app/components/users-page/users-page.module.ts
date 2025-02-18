import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { UsersPageComponent } from './users-page.component';
import { routes } from './users-page.routing';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    UsersPageComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
  ],
})
export class UsersPageModule {}
