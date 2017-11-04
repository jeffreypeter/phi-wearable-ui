import {
    Component, OnInit, Input, ViewEncapsulation, ViewChild
} from '@angular/core';
import {DataService} from '../../../../shared/services/data/data.service';
import {CollectionDataResponse} from '../../../../shared/models/collection-data-response';
import {Page} from '../../../../shared/models/page';
import {DatatableComponent} from '@swimlane/ngx-datatable';
import {ChartUserRequest} from '../../../../shared/models/chart-user-request';
import {CollectionDataRequest} from '../../../../shared/models/collection-data-request';

@Component({
    selector: 'app-user-details',
    templateUrl: './user-details.component.html',
    styleUrls: ['./user-details.component.scss'],
    providers: [DataService],
    encapsulation: ViewEncapsulation.None
})
export class UserDetailsComponent implements OnInit {

    results:object[] = [];
    view: any[] = [800, 350];
    // options
    showXAxis = true;
    showYAxis = true;
    gradient = false;
    showLegend = true;
    showXAxisLabel = true;
    xAxisLabel = 'Date';
    showYAxisLabel = true;
    yAxisLabel = 'Datatype';
    colorScheme = {
        domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
    };
    // line, area
    autoScale = true;
    @Input() collectionSelectors: UserDetailsComponent[];
    @Input() collection: any;
    @Input() username: string;
    keys = [{ name: 'Username' }, { name: 'Shim' }, { name: 'Time' }, {name: 'Values' }];
    data = [];
    level = 0;
    @ViewChild(DatatableComponent) table: DatatableComponent;
    public aggregateBy: any[] = [
        {name: 'Day', value: 'day', start: null},
        {name: 'Hour', value: 'hour', start: null},
        {name: 'Minute', value: 'minute', start: null}
    ];
    constructor(private dataService: DataService) {}

    ngOnInit() {
        this.loadChartData();
        this.setPage();
    }

    loadChartData() {
        let requestData = new ChartUserRequest();
        requestData.username = this.username;
        requestData.collection = this.collection.value;
        requestData.offset = '0';
        requestData.pageSize = '10';
        this.results = [];
        this.dataService.getChartData(requestData).subscribe(
            response => {
                // console.log(JSON.stringify(response));
                this.results = [response];
            }
        );
    }
    setPage() {
        let requestData = new CollectionDataRequest();
        requestData.collection = this.collection.value;
        requestData.aggregateBy = 'day';
        requestData.username = this.username;
        this.dataService.getCollectionData(requestData).subscribe(
            data => {
                data = data as CollectionDataResponse;
                console.log(data.data.length);
                this.data = data.data;
                this.table.offset = 0;
            }
        );
    }
    onSelect(event) {
        console.log(event);
    }
    modGranularity(event, arg) {
        let requestData = new CollectionDataRequest();
        let makeRequest :boolean = false;
        if (arg === '+') {
            if (this.level < 2) {
                this.level++;
                if (this.level === 1) {
                    this.aggregateBy[this.level].start = event.target.innerText;
                }
                makeRequest = true;
            }
            requestData.start = event.target.innerText;
        } else if (arg === '-') {
            if (this.level > 0) {
                this.level--;
                if (this.level === 1) {
                    requestData.start = this.aggregateBy[this.level].start;
                }
                makeRequest = true;
            }
        }
        if (makeRequest) {
            requestData.collection = this.collection.value;
            requestData.aggregateBy = this.aggregateBy[this.level].value;
            requestData.username = this.username
            console.log(this.level);
            console.log(event.target.innerText);
            console.log(event.target.className);

            this.dataService.getCollectionData(requestData).subscribe(
                data => {
                    data = data as CollectionDataResponse;
                    console.log(data.data.length);
                    this.data = data.data;
                    this.table.offset = 0;
                }
            );
        }
    }
}
