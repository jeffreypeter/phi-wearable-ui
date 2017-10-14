import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-users',
    templateUrl: './users.component.html',
    styleUrls: ['./users.component.scss']

})
export class UsersComponent implements OnInit {

    constructor(public router: Router) { }

    ngOnInit() {
        // console.log(this.router.url)
        if (this.router.url === '/users') {
            this.router.navigate(['/users/list-users']);
        }
    }

}
