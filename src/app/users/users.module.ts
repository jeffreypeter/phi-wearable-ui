import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersRoutingModule } from './users-routing.module';
import {SharedModule} from '../shared/shared.module';
import {UsersComponent} from './users.component';
import {ListUsersComponent} from './list-users/list-users.component';
import { UserComponent } from './user/user.component';
import {UserDetailsComponent} from './user/components/user-details/user-details.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { FormsModule } from '@angular/forms';

@NgModule({
    imports: [
        FormsModule,
        NgxDatatableModule,
        CommonModule,
        UsersRoutingModule,
        SharedModule
    ],
    declarations: [UsersComponent, ListUsersComponent, UserDetailsComponent, UserComponent]
})
export class UsersModule { }
