 /*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';
import { DomainModule } from '@domain-abstractions/domain.module';

@Module({
    imports: [DomainModule], 
    providers: [],
    exports:[]
})
export class PortsModule {}
