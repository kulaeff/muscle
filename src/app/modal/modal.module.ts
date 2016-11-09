import { NgModule } from '@angular/core';

import { ModalsComponent }   from './modal.component';
import { ModalService }   from './modal.service';

@NgModule({
    imports: [],
    exports: [ ModalsComponent ],
    declarations: [ ModalsComponent ],
    providers: [ ModalService ],
})
export class ModalModule { }
