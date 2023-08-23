import { Query } from "@shared-libraries/core/ddd/domain/base-classes/query-handler.base";

export class GetDocumentVerificationQuery extends Query {
  constructor(props: GetDocumentVerificationQuery) {
    super();
    Object.assign(this, props);
  }

  id?: string
  tenantId?: string
  organization?: string
}
