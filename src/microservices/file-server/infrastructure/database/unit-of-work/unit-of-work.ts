
import { Injectable } from '@nestjs/common';
import { Mapper } from '@automapper/core';

import { TypeormUnitOfWork } from '@shared-libraries/core/ddd/infrastructure/database/base-classes/typeorm-unit-of-work';
import { DocumentRepository } from '@file-server/domain-abstractions/adapters/document.repository';
import { DocumentOrmEntity } from '@file-server/domain-abstractions/data/entities/common/documents.entity';
  

@Injectable()
export class UnitOfWork extends TypeormUnitOfWork {

  getDocumentRepository(correlationId: string, autoMapper: Mapper): DocumentRepository {
    return new DocumentRepository(
      this.getOrmRepository(DocumentOrmEntity, correlationId),autoMapper
    ).setCorrelationId(correlationId);
  }
 
}
