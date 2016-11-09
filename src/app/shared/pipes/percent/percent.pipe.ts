import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: "percent"
})

/**
 * Converts value to percent of 100
 */
export class PercentPipe implements PipeTransform {
    transform(value: number, total?: number): string {
        if (total) {
            return (value * 100 / total).toFixed(2) + '%';
        }
        else {
            return value + '%';
        }
    }
}