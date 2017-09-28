import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {DataService} from '../shared/services/data/data.service';
import { JsonPipe } from '@angular/common';

@Component({
    selector: 'app-collections',
    templateUrl: './collections.component.html',
    styleUrls: ['./collections.component.scss'],
    providers: [DataService]
})
export class CollectionsComponent implements OnInit {

    collectionData = {};
    datatypes = ['heart-rate', 'steps'];
    constructor(private dataService: DataService ) { }
    // onChange($event) {
    //
    // }
    ngOnInit(): void {
        console.log(this.dataService.className);
        this.dataService.getCollectionData('test').subscribe(
            data => {
                console.log('success');
                this.collectionData = data;
            }/*,
            () => console.log('Completed!')*/
        );
        console.log('after service call');
        /*if (this.router.url === '/') {
            this.router.navigate(['/heart-rate']);
        }*/
    }

}
