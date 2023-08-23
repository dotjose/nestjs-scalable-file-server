import { QueryHandler } from "@nestjs/cqrs";
import { QueryHandlerBase } from "@shared-libraries/core/ddd/domain/base-classes/query-handler.base";
import { Result } from "@shared-libraries/core/ddd/domain/utils/result.util";
import { Inject } from "@nestjs/common";
import { DocumentRepositoryPort } from "@file-server/ports";
import { GetDocumentVerificationQuery } from "@file-server/view-adapter/impl/queries/impl/get-document-verification";

@QueryHandler(GetDocumentVerificationQuery)
export class GetDocumentVerificationQueryHandler extends QueryHandlerBase {
  constructor(
    @Inject(DocumentRepositoryPort) private readonly documentRepository: DocumentRepositoryPort,
  ) {
    super();
  }

  async handle(query: GetDocumentVerificationQuery) {
    let verificationResult;

    try {
      const document = await this.documentRepository.findOneByIdOrThrow(query.id);
      const verificationResponse = document.getPropsCopy().verificationResponse;
      verificationResult = JSON.parse(verificationResponse);
    }
    catch (e) {
      verificationResult = "No KYB verification Data found";
    }
    
    return Result.ok(verificationResult);

  }
}
