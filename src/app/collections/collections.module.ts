import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CollectionsRoutingModule } from './collections-routing.module';
import { CollectionsComponent } from './collections.component';
import {SharedModule} from '../shared/shared.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { MultiSelectModule, CalendarModule } from 'primeng/primeng';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

@NgModule({
    imports: [
        FormsModule,
        CommonModule,
        CollectionsRoutingModule,
        SharedModule,
        HttpClientModule,
        NgxDatatableModule,
        MultiSelectModule,
        CalendarModule,
        NgbModule.forRoot()
    ],
    declarations: [
        CollectionsComponent
    ]
})
export class CollectionsModule { }
