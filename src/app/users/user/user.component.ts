import {AfterViewInit, Component, OnInit, QueryList, ViewChildren} from '@angular/core';
import { ActivatedRoute} from '@angular/router'
import {UserDetailsComponent} from './components/user-details/user-details.component';
import {ChartUserRequest} from '../../shared/models/chart-user-request';
import {DataService} from '../../shared/services/data/data.service';

@Component({
    selector: 'app-user',
    templateUrl: './user.component.html',
    providers: [DataService],
    styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit, AfterViewInit {

    @ViewChildren(UserDetailsComponent) datatableViewChildren: QueryList<UserDetailsComponent>;
    public username: string;

    public collectionLst: any = [
        {name: 'Heart Rate', value: 'heart-rate', element: 'heartRate'},
        {name: 'Step Count', value: 'step-count', element: 'stepCount'},
        {name: 'Calories Burned', value: 'calories-burned', element: 'caloriesBurned'},
        {name: 'Sleep Duration', value: 'sleep-duration', element: 'sleepDuration'}
    ];

    collectionSelectors: UserDetailsComponent[];
    constructor(private activatedRoute: ActivatedRoute, private dataService: DataService) {
        this.username = activatedRoute.snapshot.params['username']
    }

    ngOnInit() {
        console.log(this.username);
    }
    ngAfterViewInit() {
        /*this.collectionSelectors = this.datatableViewChildren.toArray();
        console.log(this.collectionSelectors);*/
    }

}
