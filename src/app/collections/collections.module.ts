import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CollectionsRoutingModule } from './collections-routing.module';
import { CollectionsComponent } from './collections.component';
import {SharedModule} from '../shared/shared.module';
import { HeartRateComponent } from './heart-rate/heart-rate.component';
import { HttpClientModule } from '@angular/common/http';
// import {TranslateModule} from "@ngx-translate/core";
// import { HeaderComponent, SidebarComponent } from '../shared'

@NgModule({
    imports: [
        CommonModule,
        CollectionsRoutingModule,
        SharedModule,
        HttpClientModule
    ],
    declarations: [
        CollectionsComponent,
        HeartRateComponent
    ]
})
export class CollectionsModule { }
