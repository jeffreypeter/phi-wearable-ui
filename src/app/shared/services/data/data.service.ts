import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/map';
import {CollectionDataResponse} from '../../models/collection-data-response';
import {ChartUserResponse} from '../../models/chart-user-response';
import {ChartUserRequest} from '../../models/chart-user-request';
import {DataSyncResponse} from '../../models/datasync-response';
import {CollectionDataRequest} from '../../models/collection-data-request';
import {RequestOptions, ResponseContentType} from '@angular/http';

@Injectable()
export class DataService {

    baseURL = 'https://homeshare.soic.indiana.edu/shimmer';
    // baseURL = 'http://localhost:8083';
    constructor(private http: HttpClient) { }

    getCollectionData ( requestData: any ) {
        let url: string = this.baseURL
                            + '/export/json?datatype=' + requestData.collection
                            + '&aggregateBy=' + requestData.aggregateBy
                            // + '&offset=' + requestData.offset
                            // + '&pageSize=' + requestData.pageSize;

        if (requestData.username) {
            url = url + '&username=' + requestData.username;
        }
        if (requestData.start) {
            url = url + '&start=' + requestData.start;
        }
        console.log(url);
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
    exportCollection(requestData: CollectionDataRequest) {
        let url: string = this.baseURL
            + '/export/excel?datatype=' + requestData.collection
            + '&aggregateBy=' + requestData.aggregateBy
        if (requestData.username) {
            url = url + '&username=' + requestData.username;
        }
        if (requestData.start) {
            url = url + '&start=' + requestData.start;
        }
        if (requestData.end) {
            url = url + '&start=' + requestData.end;
        }
        console.log(url);
        return this.http.get(url, {responseType: 'arraybuffer'});
    }

}
