import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {CollectionsComponent} from './collections.component';
import {HeartRateComponent} from './heart-rate/heart-rate.component';

const routes: Routes = [
    {
        path: '', component: CollectionsComponent,
        children: [
            { path: 'heart-rate', component: HeartRateComponent}
        ]
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CollectionsRoutingModule { }
