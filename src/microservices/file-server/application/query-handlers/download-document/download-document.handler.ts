import { QueryHandler } from "@nestjs/cqrs";
import { QueryHandlerBase } from "@shared-libraries/core/ddd/domain/base-classes/query-handler.base";
import { Result } from "@shared-libraries/core/ddd/domain/utils/result.util";
// import { DocumentEntity } from "@file-server/model/entity";
import { Inject } from "@nestjs/common";
import { DocumentRepositoryPort } from "@file-server/ports";
import { DownloadDocumentQuery } from "@file-server/view-adapter/impl/queries/impl/download-document.query";
import { LocalFileAccess } from "@file-server/domain-abstractions/adapters/local-file-acces";

@QueryHandler(DownloadDocumentQuery)
export class DownloadDocumentQueryHandler extends QueryHandlerBase {
  constructor( 
    @Inject(DocumentRepositoryPort) private readonly documentRepository: DocumentRepositoryPort,
    private localFileAccess: LocalFileAccess
  ) {
    super();
  }

  async handle(query: DownloadDocumentQuery){
    const document = await this.documentRepository.findOneByIdOrThrow(query.id);
    let file = await this.localFileAccess.downloadFromFtp(document.getPropsCopy().location)
    
    return Result.ok(file);
  }
}
