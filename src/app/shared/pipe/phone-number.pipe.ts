import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'PhoneNumberPipe'
})
export class PhoneNumberPipe implements PipeTransform {

    transform(value: string): string {
        if (value == null) return;
        let arr = value.trim().split('');
        for (let i = 0; i < 6; ++i) {
            arr[i] = '*';
        }

        let newStr = arr.join('');
        return newStr;

    }
}
