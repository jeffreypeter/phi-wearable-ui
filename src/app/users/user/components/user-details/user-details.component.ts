import {
    Component, OnInit, Input, ViewEncapsulation, ViewChild, ViewChildren, QueryList,
    AfterViewInit, ElementRef
} from '@angular/core';
import {DataService} from '../../../../shared/services/data/data.service';
import {CollectionDataResponse} from '../../../../shared/models/collection-data-response';
import {Page} from '../../../../shared/models/page';
import {DatatableComponent} from '@swimlane/ngx-datatable';

@Component({
    selector: 'app-user-details',
    templateUrl: './user-details.component.html',
    styleUrls: ['./user-details.component.scss'],
    providers: [DataService],
    encapsulation: ViewEncapsulation.None
})
export class UserDetailsComponent implements OnInit, AfterViewInit {

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
    public requestData: any = {collection: '', aggregateBy: '', username: '', offset: '', pageSize: ''};
    page = new Page();
    constructor(private dataService: DataService) {
        this.page.pageNumber = 0;
        this.page.size = 10;
    }

    ngOnInit() {
        this.requestData.collection = this.collection.value;
        this.requestData.aggregateBy = 'day';
        this.requestData.username = this.username;
        this.requestData.offset = this.page.pageNumber;
        this.requestData.pageSize = this.page.size;
        this.setPage({offset: 0});
    }
    ngAfterViewInit() {
        // let datatables: DatatableComponent[] = this.datatableViewChildren.toArray();
        // console.log(datatables);
    }
    onAggregateChange(event) {
        console.log(event.target.value);

    }
    setPage(pageInfo) {
        // console.log(pageInfo)
        this.page.pageNumber = pageInfo.offset;
        this.requestData.offset = pageInfo.offset;
        this.dataService.getCollectionData(this.requestData).subscribe(
            data => {
                data = data as CollectionDataResponse;
                console.log(data.data.length);
                this.data = data.data;
                this.page.totalElements = 100;
                this.page.totalPages = this.page.totalElements / this.page.size;

            }
        );
    }

}
