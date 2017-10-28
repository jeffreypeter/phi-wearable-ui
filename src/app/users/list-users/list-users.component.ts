import { Component, OnInit } from '@angular/core';
import {DataService} from '../../shared/services/data/data.service';
import {DataSyncResponse} from '../../shared/models/datasync-response';
import { DatePipe } from '@angular/common';

@Component({
    selector: 'app-list-users',
    templateUrl: './list-users.component.html',
    styleUrls: ['./list-users.component.scss'],
    providers: [DataService]
})
export class ListUsersComponent implements OnInit {

    syncDetails: any[]= [];
    constructor(private dataService: DataService) { }

    ngOnInit() {
        this.dataService.getSyncDetails().subscribe(
            data => {
                console.log('success');
                this.syncDetails = data.data;
                console.log(data);
            }
        );
    }
    checkCondition(value: number): boolean {
        console.log("checkCondition");
        let diff = new Date().getTime() - value;
        console.log(diff);
        if (( diff ) > 172800000) {
            return true;
        }
        return false;
    }
}
