import { Query } from "@shared-libraries/core/ddd/domain/base-classes/query-handler.base";

export class DownloadDocumentQuery extends Query {
  id : string
  constructor(id: string) {
    super(); 
    this.id = id
  } 
}
