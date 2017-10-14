import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ListUsersComponent} from './list-users/list-users.component';
import {UsersComponent} from './users.component';
import {UserComponent} from './user/user.component';

const routes: Routes = [
    {
        path: '', component: UsersComponent,
        children: [
            { path: 'list-users', component: ListUsersComponent},
            { path: ':username', component: UserComponent },
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class UsersRoutingModule { }
