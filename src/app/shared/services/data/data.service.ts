import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';
import {CollectionDataResponse} from '../../models/collection-data-response';
import {ChartUserResponse} from '../../models/chart-user-response';
import {ChartUserRequest} from '../../models/chart-user-request';
import {DataSyncResponse} from '../../models/datasync-response';

@Injectable()
export class DataService {

    baseURL = 'https://homeshare.soic.indiana.edu/shimmer';
    constructor(private http: HttpClient) { }

    getCollectionData ( requestData: any ) {
        let url: string = this.baseURL
                            + '/export/json?datatype=' + requestData.collection
                            + '&aggregateBy=' + requestData.aggregateBy
                            + '&offset=' + requestData.offset
                            + '&pageSize=' + requestData.pageSize;
        if (requestData.username) {
            url = url + '&username=' + requestData.username;
        }
         return this.http.get<CollectionDataResponse>(url);
    }

    getUserData () {
        let url: string = this.baseURL + '/users';
        return this.http.get<any[]>(url);
    }
    getSyncDetails () {
        let url: string = this.baseURL + '/syncDetails';
        return this.http.get<DataSyncResponse>(url);
    }
    getChartData( requestData:ChartUserRequest ) {
        console.log(requestData);
        let url: string = this.baseURL
            + '/chart/' + requestData.username + '/' + requestData.collection
            + '?offset=' + requestData.offset
            + '&pageSize=' + requestData.pageSize;
        console.log(url);
        return this.http.get<ChartUserResponse>(url);
    }

}
