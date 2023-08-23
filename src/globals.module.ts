import { NestEventModule } from "nest-event";
import { Global, Module, CacheModule, Logger } from "@nestjs/common";
import { TerminusModule } from "@nestjs/terminus";
import { TypeOrmModule } from "@nestjs/typeorm";

import { HttpModule } from "@nestjs/axios";
import { CqrsModule } from "@nestjs/cqrs";
import { classes } from "@automapper/classes";
import { AutomapperModule } from "@automapper/nestjs";
import { ScheduleModule } from "@nestjs/schedule";
import { typeormConfig } from "shared-config/data/ormconfig";


@Global()
@Module({
  imports: [
    TypeOrmModule.forRoot(typeormConfig),
    CacheModule.register({
      isGlobal: true,
    }),
    CqrsModule,
    ScheduleModule.forRoot(),
    AutomapperModule.forRoot({
      options: [{ name: "classes", pluginInitializer: classes }],
      singular: true,
    }),
    NestEventModule,
    TerminusModule,
    HttpModule,
  ],
  providers: [Logger],
  exports: [
    HttpModule,
  ],
})
export class GlobalsModule {}
