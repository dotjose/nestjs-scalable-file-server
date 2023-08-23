import { QueryHandler } from "@nestjs/cqrs";
import { QueryHandlerBase } from "@shared-libraries/core/ddd/domain/base-classes/query-handler.base";
import { Result } from "@shared-libraries/core/ddd/domain/utils/result.util";
import { DocumentProps } from "@file-server/model/entity";
import { Inject } from "@nestjs/common"; 
import { GetDocumentsQuery } from "@file-server/view-adapter/impl/queries/impl/get-documents.query";
import { DocumentRepositoryPort } from "@file-server/ports";

@QueryHandler(GetDocumentsQuery)
export class GetDocumentsQueryHandler extends QueryHandlerBase {
  constructor( @Inject(DocumentRepositoryPort) private readonly documentRepository: DocumentRepositoryPort ) {
    super();
  }
  

  async handle(query: GetDocumentsQuery): Promise<Result<DocumentProps[]>> {
    let where = {organization : query.organization} 
    const documents = await this.documentRepository.findDocuments(where);
    return Result.ok(documents);
  }
}
