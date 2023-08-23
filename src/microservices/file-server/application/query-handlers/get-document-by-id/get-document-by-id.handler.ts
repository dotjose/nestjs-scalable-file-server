import { QueryHandler } from "@nestjs/cqrs";
import { QueryHandlerBase } from "@shared-libraries/core/ddd/domain/base-classes/query-handler.base";
import { Result } from "@shared-libraries/core/ddd/domain/utils/result.util";
import { Inject } from "@nestjs/common";
import { DocumentRepositoryPort } from "@file-server/ports";
import { GetDocumentVerificationQuery } from "@file-server/view-adapter/impl/queries/impl/get-document-verification";

@QueryHandler(GetDocumentVerificationQuery)
export class GetDocumentVerificationQueryHandler extends QueryHandlerBase {
  [x: string]: any;
  constructor(
    @Inject(DocumentRepositoryPort) private readonly documentRepository: DocumentRepositoryPort,
  ) {
    super();
  }

  async handle(query: GetDocumentVerificationQuery) {
    const document = await this.documentRepository.findOneByIdOrThrow(query.id);
    let file = await this.localFileAccess.downloadFromFtp(document.getPropsCopy().location)

    return Result.ok(file);
  }
}
