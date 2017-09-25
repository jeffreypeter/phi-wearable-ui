import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CollectionsRoutingModule } from './collections-routing.module';
import { CollectionsComponent } from './collections.component';
import {SharedModule} from '../shared/shared.module';
// import {TranslateModule} from "@ngx-translate/core";
// import { HeaderComponent, SidebarComponent } from '../shared'

@NgModule({
    imports: [
        CommonModule,
        CollectionsRoutingModule,
        SharedModule
    ],
    declarations: [
        CollectionsComponent
    ]
})
export class CollectionsModule { }
