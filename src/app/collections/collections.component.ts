import {Component, OnInit, ViewEncapsulation, ViewChild} from '@angular/core';
import {DataService} from '../shared/services/data/data.service';
import {CollectionDataResponse} from '../shared/models/collection-data-response';
import {CollectionDataRequest} from '../shared/models/collection-data-request';
import {DatatableComponent} from '@swimlane/ngx-datatable';
import {SelectItem} from 'primeng/primeng';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import * as FileSaver from 'file-saver';



@Component({
    selector: 'app-collections',
    templateUrl: './collections.component.html',
    styleUrls: ['./collections.component.scss'],
    providers: [DataService],
    encapsulation: ViewEncapsulation.None
})

export class CollectionsComponent implements OnInit {

    selCollection: SelectItem[] = [];
    selUser: any[] = [];
    selAggregateBy: string;
    minDate: Date;
    maxDate: Date;
    dataStartDate: Date;
    dataEndDate: Date;
    closeResult: string;
    @ViewChild('content') content;

    collectionLst: any = [
        {name: 'Heart Rate', value: 'heart-rate'},
        {name: 'Step Count', value: 'step-count'},
        {name: 'Sleep Duration', value: 'sleep-duration'},
        {name: 'Calories Burned', value: 'calories-burned'}
    ];
    syncDetails: any[]= [];
    public aggregateBy: any = [
        {name: 'Minute', value: 'minute'},
        {name: 'Hour', value: 'hour'},
        {name: 'Day', value: 'day'}
    ];
    constructor(private dataService: DataService, private modalService: NgbModal) {
        this.minDate = new Date(2017, 9, 1)
        this.maxDate = new Date();
        this.dataStartDate = new Date();
    }
    ngOnInit(): void {
        this.loadUserDetails();
    }
    export() {
        console.log(this.selAggregateBy)
        let collections: string[] = [];
        for (let i = 0 ; i < this.selCollection.length; i++) {
            collections[i] = this.selCollection[i].value;
        }
        let users: string[] = [];
        for (let i = 0 ; i < this.selUser.length; i++) {
            users[i] = this.selUser[i].userId;
        }
        console.log(collections);
        console.log(users);
        if (users.length === 0 || collections.length === 0 || typeof (this.dataStartDate) === 'undefined') {
            alert('Please select users, collections and start date from the list');
            return;
        } else {
            let exportRequest = new CollectionDataRequest();
            console.log(this.dataStartDate.toISOString().split("T")[0]);
            exportRequest.aggregateBy = this.selAggregateBy;
            exportRequest.start = this.dataStartDate.toISOString().split("T")[0];
            exportRequest.collection = collections.join();
            exportRequest.username = users.join();
            if (typeof (this.dataEndDate) !== 'undefined') {
                exportRequest.end = this.dataEndDate.toISOString().split("T")[0];
            }
            console.log(exportRequest);
            this.dataService.exportCollection(exportRequest).subscribe(
                response => {
                    console.log('success');
                    this.saveToFileSystem(response);
                }
            );
        }
    }
    private saveToFileSystem(response) {
        console.log(response);
        /*let fileBlob = response.blob();
        let blob = new Blob([fileBlob], {
            type: 'application/octet-stream' // must match the Accept type
        });*/
        console.log(response);
        let blob = new Blob([response], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;' });
        FileSaver.saveAs(blob, 'export.xlsx');
    }
    private loadUserDetails() {
        this.dataService.getSyncDetails().subscribe(
            data => {
                console.log('success');
                this.syncDetails = data.data;
                console.log(this.syncDetails);
            }
        );
    }
    /*open(content) {
        this.modalService.open(content).result.then((result) => {
            this.closeResult = `Closed with: ${result}`;
        }, (reason) => {
            this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        });
    }

    private getDismissReason(reason: any): string {
        if (reason === ModalDismissReasons.ESC) {
            return 'by pressing ESC';
        } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
            return 'by clicking on a backdrop';
        } else {
            return  `with: ${reason}`;
        }
    }*/
}
