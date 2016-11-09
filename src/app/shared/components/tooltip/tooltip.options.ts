import { Injectable } from '@angular/core';

@Injectable()
export class TooltipOptions {
    public left: number;
    public top: number;

    constructor(options: Object) {
        Object.assign(this, options);
    }
}
