import { CommandHandler } from '@nestjs/cqrs'
import { Inject } from '@nestjs/common';

import { UpdateDocumentStatusCommand } from '@file-server/view-adapter/impl/commands/update-document-status'
import { Result } from '@shared-libraries/core/ddd/domain/utils/result.util'
import { CommandHandlerBase } from '@shared-libraries/core/ddd/domain/base-classes/command-handler.base'
import { UnitOfWork } from '@infrastructure/database/unit-of-work/unit-of-work'
import { DocumentEntity } from '@model/entity'
import { DocumentStatus } from '@file-server/model/enum/business.enum'
import { DocumentRepositoryPort } from '@ports/repository/document.repository.port'
import { DocumentNotFoundException } from '@file-server/model/exception/document-not-found.exception';

@CommandHandler(UpdateDocumentStatusCommand)
export class UpdateDocumentStatusCommandHandler extends CommandHandlerBase {
  constructor(
    protected readonly unitOfWork: UnitOfWork,
    @Inject(DocumentRepositoryPort) private readonly documentRepository: DocumentRepositoryPort,
  ) {
    super(unitOfWork)
  }

  async handle(
    command: UpdateDocumentStatusCommand,
  ): Promise<
    Result<UpdateDocumentStatusCommand | DocumentNotFoundException>
  > {
    try {
      const { documentId, status } = command
      const document = await this.documentRepository.findOneByIdOrThrow(documentId);
      const newStatus = status as DocumentStatus;
      const { id, metadata, documentType, location, purpose, organization, name, verificationResponse } = document.getPropsCopy();
      const documentEntity = DocumentEntity.update({
        status: newStatus,
        id,
        metadata,
        documentType,
        location,
        purpose,
        organization,
        name,
        verificationResponse
      })
      await this.documentRepository.update(documentId, documentEntity);
      return Result.ok(command);
    } catch (e) {
      return Result.err(new DocumentNotFoundException())
    }
  }
}
