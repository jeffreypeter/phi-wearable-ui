import {AfterViewInit, Component, OnInit, QueryList, ViewChildren} from '@angular/core';
import { ActivatedRoute} from '@angular/router'
import {UserDetailsComponent} from './components/user-details/user-details.component';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit, AfterViewInit {

    @ViewChildren(UserDetailsComponent) datatableViewChildren: QueryList<UserDetailsComponent>
    public username: string;
    public collectionLst: any = [
        {name: 'Heart Rate', value: 'heart-rate', element: 'heartRate'},
        {name: 'Step Count', value: 'step-count', element: 'stepCount'},
        {name: 'Sleep Duration', value: 'sleep-duration', element: 'sleepDuration'},
        {name: 'Calories Burned', value: 'calories-burned', element: 'caloriesBurned'}
    ];
    collectionSelectors: UserDetailsComponent[];
    constructor(private activatedRoute: ActivatedRoute) {
        this.username = activatedRoute.snapshot.params['username']
    }

    ngOnInit() {
        console.log(this.username);
    }
    ngAfterViewInit() {
        this.collectionSelectors = this.datatableViewChildren.toArray();
        console.log(this.collectionSelectors);

    }

}
