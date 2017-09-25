import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HeaderComponent} from './components/header/header.component';
import {SidebarComponent} from './components/sidebar/sidebar.component';
import {TranslateModule} from '@ngx-translate/core';
import {RouterModule} from '@angular/router';
// import { HeaderComponent, SidebarComponent } from '';

@NgModule({
    imports: [
        CommonModule,
        TranslateModule,
        RouterModule
    ],
    declarations: [
        HeaderComponent,
        SidebarComponent
    ],
    exports: [
        SidebarComponent,
        HeaderComponent
    ]
})
export class SharedModule { }
