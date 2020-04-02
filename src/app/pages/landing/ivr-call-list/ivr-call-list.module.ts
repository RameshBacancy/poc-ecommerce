import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { IvrCallListComponent } from './ivr-call-list.component';
import { CoreModule } from 'src/app/core/core.module';

const routes = [
    {
        path: '',
        component: IvrCallListComponent
    }
];

@NgModule({
    declarations: [
        IvrCallListComponent
    ],
    imports: [
        CommonModule,
        CoreModule,
        RouterModule.forChild(routes),
    ],
    exports: [
        IvrCallListComponent
    ]
})

export class IvrCallListModule {
}
