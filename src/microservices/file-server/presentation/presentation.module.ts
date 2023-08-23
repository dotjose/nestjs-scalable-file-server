/*
https://docs.nestjs.com/modules
*/


import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { ScheduleModule } from '@nestjs/schedule';

import { COMMAND_HANDLERS } from '@application/commands-handlers';
import { HttpRestController } from '@presentation/controllers/http-rest.controller';
import { GRPCController } from '@presentation/controllers/grpc.controller';
import { WebSocketsController } from '@presentation/controllers/web-sockets.controller';
import { DocumentRepositoryPort } from '@file-server/ports';
import { DocumentRepository } from '@file-server/domain-abstractions/adapters/document.repository';

const CONTROLLERS = [HttpRestController,GRPCController,WebSocketsController]
@Module({
    imports: [CqrsModule,  ScheduleModule.forRoot()],
    controllers: [...CONTROLLERS],
    providers: [
        ...COMMAND_HANDLERS,
        { provide: DocumentRepositoryPort, useClass: DocumentRepository },
    ],
})
export class PresentationModule {}
