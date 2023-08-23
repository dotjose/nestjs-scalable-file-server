import { Global, Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { REPOSITORY } from "./adapters";  
import { ORM_ENTITY } from "./data";

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([...ORM_ENTITY]) ],
  providers: [...REPOSITORY],
  exports: [TypeOrmModule.forFeature([...ORM_ENTITY])],
})
export class DomainModule {}
