import {Component, OnInit, ViewEncapsulation, ViewChild} from '@angular/core';
import {DataService} from '../shared/services/data/data.service';
import {CollectionDataResponse} from '../shared/models/collection-data-response';
import {CollectionDataRequest} from '../shared/models/collection-data-request';
import {DatatableComponent} from '@swimlane/ngx-datatable';

@Component({
    selector: 'app-collections',
    templateUrl: './collections.component.html',
    styleUrls: ['./collections.component.scss'],
    providers: [DataService],
    encapsulation: ViewEncapsulation.None
})
export class CollectionsComponent implements OnInit {

    keys = [];
    data = [];
    temp = [];
    public collectionLst: any = [
        {name: 'Heart Rate', value: 'heart-rate'},
        {name: 'Step Count', value: 'step-count'},
        {name: 'Sleep Duration', value: 'sleep-duration'},
        {name: 'Calories Burned', value: 'calories-burned'}
    ];
    public aggregateBy: any = [
        {name: 'Day', value: 'day'},
        {name: 'Hour', value: 'hour'},
        {name: 'Minute', value: 'minute'}
    ];
    @ViewChild(DatatableComponent) table: DatatableComponent;
    public requestData: CollectionDataRequest = new CollectionDataRequest();
    constructor(private dataService: DataService) { }
    ngOnInit(): void {
        this.requestData.collection = 'heart-rate';
        this.requestData.aggregateBy = 'day';
        this.requestData.pageSize = '100';
        this.requestData.offset = '0';
        this.onSubmit();
    }

    onSubmit() {
        // console.log(this.requestData);
        this.dataService.getCollectionData(this.requestData).subscribe(
            data => {
                console.log('success');
                data = data as CollectionDataResponse;
                this.keys = [{ name: 'Username' }, { name: 'Shim' }, { name: 'Time' }, {name: 'Values' }];
                this.temp = [...data.data];
                this.data = data.data;
                this.table.offset = 0;
            }
        );
    }
    updateFilter(event) {
        const val = event.target.value.toLowerCase();

        // filter our data
        const temp = this.temp.filter(function(d) {
            return d.username.toLowerCase().indexOf(val) !== -1 || !val;
        });

        // update the rows
        this.data = temp;
        // Whenever the filter changes, always go back to the first page
        // console.log(this.table);
        this.table.offset = 0;
    }

}
