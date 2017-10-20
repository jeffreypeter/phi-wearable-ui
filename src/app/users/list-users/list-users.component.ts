import { Component, OnInit } from '@angular/core';
import {DataService} from '../../shared/services/data/data.service';

@Component({
    selector: 'app-list-users',
    templateUrl: './list-users.component.html',
    styleUrls: ['./list-users.component.scss'],
    providers: [DataService]
})
export class ListUsersComponent implements OnInit {

    userData: any = [];

    constructor(private dataService: DataService) { }

    ngOnInit() {
        this.dataService.getUserData().subscribe(
            data => {
                console.log('success');
                this.userData = data;
                console.log(data);
            }
        );
    }

}
