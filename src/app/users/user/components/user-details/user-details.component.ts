import {
    Component, OnInit, Input, ViewEncapsulation, ViewChild, ViewChildren, QueryList,
    AfterViewInit, ElementRef
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
export class UserDetailsComponent implements OnInit, AfterViewInit {

    results:object[] = [];
    view: any[] = [800, 400];
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
    // @ViewChildren(DatatableComponent) datatableViewChildren: QueryList<DatatableComponent>;
    @ViewChild(DatatableComponent) table: DatatableComponent;
    @Input() collectionSelectors: UserDetailsComponent[];
    @Input() collection: any;
    @Input() username: string;
    keys = [{ name: 'Username' }, { name: 'Shim' }, { name: 'Time' }, {name: 'Values' }];
    data = [];
    public aggregateBy: any[] = [
        {name: 'Day', value: 'day'},
        {name: 'Hour', value: 'hour'},
        {name: 'Minute', value: 'minute'}
    ];

    page = new Page();
    constructor(private dataService: DataService) {
        this.page.pageNumber = 0;
        this.page.size = 10;
    }

    ngOnInit() {
        this.loadChartData();
        this.setPage({offset: 0});
    }
    ngAfterViewInit() {
        // let datatables: DatatableComponent[] = this.datatableViewChildren.toArray();
        // console.log(datatables);
    }
    onAggregateChange(event) {
        console.log(event.target.value);
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
                console.log(JSON.stringify(response));
                this.results = [response];
            }
        );
    }
    setPage(pageInfo) {
        let requestData = new CollectionDataRequest();
        requestData.collection = this.collection.value;
        requestData.aggregateBy = 'day';
        requestData.username = this.username;
        requestData.offset = String(this.page.pageNumber);
        requestData.pageSize = String(this.page.size);
        this.page.pageNumber = pageInfo.offset;
        requestData.offset = pageInfo.offset;
        this.dataService.getCollectionData(requestData).subscribe(
            data => {
                data = data as CollectionDataResponse;
                console.log(data.data.length);
                this.data = data.data;
                this.page.totalElements = 100;
                this.page.totalPages = this.page.totalElements / this.page.size;

            }
        );
    }
    onSelect(event) {
        console.log(event);
    }

}
