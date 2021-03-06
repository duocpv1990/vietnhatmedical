import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'Overflow'
})
export class OverflowPipe implements PipeTransform {

    transform(value: string, args: string[]): string {
        if (value === null || value === undefined) {
            return;
        } else {
            const limit = args.length > 0 ? parseInt(args[0], 10) : 35;
            const trail = args.length > 1 ? args[1] : '...';
            return value.length > limit ? value.substring(0, limit) + trail : value;
        }

    }
}
