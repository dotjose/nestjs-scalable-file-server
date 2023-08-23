import { Result } from "@shared-libraries/core/ddd/domain/utils/result.util";
import { CommandHandler } from "@nestjs/cqrs";
import { Mapper } from "@automapper/core";
import { InjectMapper } from "@automapper/nestjs";

import { CommandHandlerBase } from "@shared-libraries/core/ddd/domain/base-classes/command-handler.base";
import { UnitOfWork } from "@infrastructure/database/unit-of-work/unit-of-work";
import { UUID } from "@shared-libraries/core/ddd/domain/value-objects/uuid.value-object";
import { DocumentEntity, DocumentProps } from "@model/entity";
import { DocumentRepositoryPort } from '@ports/repository/document.repository.port';
import { ID } from "@shared-libraries/core/ddd/domain/value-objects/id.value-object";

import { UploadDocumentCommand } from "@file-server/view-adapter/impl/commands/upload-document";
import { LocalFileAccess } from "@file-server/domain-abstractions/adapters/local-file-acces";
import { DocumentStatus } from "@file-server/model/enum/business.enum";

@CommandHandler(UploadDocumentCommand)
export class UploadDocumentHandler extends CommandHandlerBase {
  constructor(
    protected readonly unitOfWork: UnitOfWork, 
    private localFileAccess: LocalFileAccess, 
    @InjectMapper() private mapper: Mapper,
  ) {
    super(unitOfWork);
  }

  async handle(command: UploadDocumentCommand): Promise<Result<ID | DocumentProps>> {
    const DocumentRepo: DocumentRepositoryPort =
      this.unitOfWork.getDocumentRepository(command.correlationId, this.mapper);
      let destination = `${command.purpose}/${command.name}`;
      
    if(command.location){
      this.localFileAccess.moveToFtp(command.location, destination)
    }

    if(command.docId !== undefined) {
      const newDoc = DocumentEntity.update({
        id: new UUID(command.docId),
        purpose: command.purpose,
        name: command.name,
        documentType: command.documentType,
        location: destination,
        status: command.status || DocumentStatus.PENDING,
        metadata: command.metadata,
        organization: command.organization,
        verificationResponse:""
      });

      const updatedDoc = await DocumentRepo.update(command.docId, newDoc);
      return Result.ok(updatedDoc)
    }

    let oldDocuments = await DocumentRepo.findDocuments({ organization: command.organization, documentType: command.documentType })
    let document;

    if (oldDocuments.length) {
      document = oldDocuments[0];
      let oldid = document.id;
      let newdocument = DocumentEntity.update({
        name: command.name,
        location: destination,
        status: command.status || DocumentStatus.PENDING,
        metadata: command.metadata,
        id: oldid.props.value,
        documentType: document.documentType,
        purpose: document.purpose,
        organization: document.organization,
        verificationResponse:""
      });
      await DocumentRepo.update(oldid.props.value, newdocument);
    }
    else {
      document = DocumentEntity.create({
        id: UUID.generate(),
        purpose: command.purpose,
        name: command.name,
        documentType: command.documentType,
        location: destination,
        status: command.status || DocumentStatus.PENDING,
        metadata: command.metadata,
        organization: command.organization,
        verificationResponse:""
      });
      document = await DocumentRepo.save(document);
    }

    return Result.ok(document.id);
  }
}
