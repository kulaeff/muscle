import {Pipe, PipeTransform} from '@angular/core';

/**
 * Converts number to string according to the current user locale
 */
@Pipe({
    name: "number"
})
export class NumberPipe implements PipeTransform {
    transform(value: number): string {
        return value.toLocaleString(undefined, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        });
    }
}