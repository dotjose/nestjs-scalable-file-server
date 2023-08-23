import { Query } from "@shared-libraries/core/ddd/domain/base-classes/query-handler.base";

export class GetDocumentsQuery extends Query {
  constructor(props: GetDocumentsQuery) {
    super();
    Object.assign(this, props);
  }

  organization? : string
  purpose? : string
  documentType? : string 
}
