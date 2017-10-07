import { Component, OnInit } from '@angular/core';
import {DataService} from '../shared/services/data/data.service';

@Component({
    selector: 'app-users',
    templateUrl: './users.component.html',
    styleUrls: ['./users.component.scss'],
    providers: [DataService]

})
export class UsersComponent implements OnInit {

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
