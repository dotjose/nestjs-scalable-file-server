
/*
https://docs.nestjs.com/modules
*/

import { Global, Logger, Module } from '@nestjs/common'; 
import { UnitOfWork } from '@infrastructure/database/unit-of-work/unit-of-work';
import { ExceptionInterceptor } from '@infrastructure/interceptors/exception.interceptor';
import { LocalFileAccess } from '@file-server/domain-abstractions/adapters/local-file-acces';

const unitOfWorkSingleton = new UnitOfWork(new Logger());

const unitOfWorkSingletonProvider = {
  provide: UnitOfWork,
  useFactory: () => unitOfWorkSingleton,
};

@Global()
@Module({
  imports: [],
  providers: [unitOfWorkSingletonProvider,  ExceptionInterceptor, LocalFileAccess],
  exports: [UnitOfWork, LocalFileAccess ],
})
export class InfrastructureModule {}
