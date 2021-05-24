import { NgModule } from '@angular/core';
import { NoStraightBrick } from './pipe.custom';
import { OverflowPipe } from './overflow.pipe';

@NgModule({
    imports: [],
    declarations: [OverflowPipe],
    exports: [OverflowPipe],
    providers: [OverflowPipe]
})

export class CustomPipeModule {

    // static forRoot() {
    //     return {
    //         ngModule: CustomPipeModule,
    //         providers: [OverflowPipe],
    //     };
    // }
} 