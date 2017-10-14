import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';
import {CollectionDataResponse} from '../../models/collection-data-response';

@Injectable()
export class DataService {

    baseURL = 'https://homeshare.soic.indiana.edu/shimmer';
    constructor(private http: HttpClient) { }

    getCollectionData ( requestData: any ) {
        let url: string = this.baseURL + '/export/json?datatype=' + requestData.collection + '&aggregateBy=' + requestData.aggregateBy;
        if (requestData.username) {
            url = url + '&username=' + requestData.username;
        }
         return this.http.get<CollectionDataResponse>(url);
    }

    getUserData () {
        let url: string = this.baseURL + '/users';
        return this.http.get<any[]>(url);
    }

}
