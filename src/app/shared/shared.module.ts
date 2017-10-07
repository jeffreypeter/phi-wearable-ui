import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HeaderComponent} from './components/header/header.component';
import {SidebarComponent} from './components/sidebar/sidebar.component';
import {PageHeaderComponent} from './modules/page-header/page-header.component'
import {TranslateModule} from '@ngx-translate/core';
import {RouterModule} from '@angular/router';
import {PageHeaderModule} from './modules/page-header/page-header.module';
// import { HeaderComponent, SidebarComponent } from '';

@NgModule({
    imports: [
        CommonModule,
        TranslateModule,
        RouterModule,
        PageHeaderModule
    ],
    declarations: [
        HeaderComponent,
        SidebarComponent
    ],
    exports: [
        SidebarComponent,
        HeaderComponent,
        PageHeaderComponent
    ]
})
export class SharedModule { }
