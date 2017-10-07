import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TablesComponent } from './tables.component';
import { TablesRoutingModule } from './tables-routing.module';
import {SharedModule} from '../../shared/shared.module';

@NgModule({
    imports: [
        CommonModule,
        TablesRoutingModule,
        SharedModule
    ],
    declarations: [TablesComponent]
})
export class TablesModule { }
