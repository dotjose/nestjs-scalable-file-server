import { ConfigModule } from '@nestjs/config';
import { Module } from "@nestjs/common";
import { CqrsModule } from "@nestjs/cqrs";
import { DomainModule } from "@domain-abstractions/domain.module";
import { InfrastructureModule } from "@infrastructure/infrastructure.module";
import { ExceptionInterceptor } from "@infrastructure/interceptors/exception.interceptor";
import { ModelModule } from "@model/model.module";
import { PortsModule } from "@ports/ports.module";
import { PresentationModule } from "@presentation/presentation.module";
import { COMMAND_HANDLERS } from "./commands-handlers";
import { QUERY_HANDLERS } from "./query-handlers";
import { REPOSITORY } from "@file-server/domain-abstractions/adapters";
import { DocumentRepository } from "@file-server/domain-abstractions/adapters/document.repository";
import { DocumentRepositoryPort } from "@file-server/ports";


@Module({
  imports: [
    CqrsModule,
    DomainModule,
    InfrastructureModule,
    PortsModule,
    ModelModule,
    PresentationModule,
    ConfigModule.forRoot(),
  ],
  exports: [...COMMAND_HANDLERS],
  providers: [
    ...COMMAND_HANDLERS,
    ...QUERY_HANDLERS,
    ...REPOSITORY,
    ExceptionInterceptor,
    { provide: DocumentRepositoryPort, useClass: DocumentRepository },
  ],
})
export class ApplicationModule {}
