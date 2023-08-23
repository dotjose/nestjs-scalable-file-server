
  
import { ModelModule } from "@model/model.module"; 
import { PortsModule } from "@ports/ports.module";
import { GlobalsModule } from "./globals.module"; 
import { Module } from "@nestjs/common"; 
import { ConfigModule } from './shared-config/config.module';
import { FileServerModule } from "@file-server/file-server.module";
@Module({
  imports: [
    GlobalsModule,
    PortsModule,
    ConfigModule,
    ModelModule,
    FileServerModule,
  ],
  providers: [],
})
export class AppModule {}