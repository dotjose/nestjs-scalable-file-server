import { DocumentEntity, DocumentProps } from '@file-server/model/entity';
import { RepositoryPort } from '@shared-libraries/core/ddd/domain/ports/repository.ports';  
import { GetDocumentsQuery } from '@file-server/view-adapter/impl/queries/impl/get-documents.query';

 
export interface DocumentRepositoryPort
  extends RepositoryPort<DocumentEntity, DocumentProps> {
  findDocByStatus(purpose: string, status: string): Promise<DocumentProps[]>;
  findOneByIdOrThrow(id: string): Promise<DocumentEntity>;
  findOneBylegalNameOrThrow(legalName: string): Promise<DocumentEntity>;
  exists(legalName: string): Promise<boolean>;
  findDocuments(query: GetDocumentsQuery): Promise<DocumentProps[]> ;
}
export const DocumentRepositoryPort = Symbol("DocumentRepositoryPort");