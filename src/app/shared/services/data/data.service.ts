import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';

@Injectable()
export class DataService {

    className = 'DataService'
    apiURL = 'https://homeshare.soic.indiana.edu/shimmer/utils/export/json?datatype=heart-rate&aggregateBy=hour';
    constructor(private http: HttpClient) { }


    getCollectionData ( datatype: string ) {
        // return this.http.get('https://api.github.com/users/seeschweiler');
         return this.http.get(this.apiURL);
             /*.map(function (res: Response) {
                 return res.json();
             });*/
    }

}
/*interface Response {
    data:any;
}*/
