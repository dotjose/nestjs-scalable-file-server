import { AggregateRoot } from "@shared-libraries/core/ddd/domain/base-classes/aggregate-root.base";
// import { Guard } from "@shared-libraries/core/ddd/domain/guard";
import { UUID } from "@shared-libraries/core/ddd/domain/value-objects/uuid.value-object";
import { DocumentPurpose, DocumentStatus, DocumentTypes } from "../enum/business.enum";

export interface DocumentProps {
  id: UUID;
  documentType: DocumentTypes;
  name: string;
  purpose: DocumentPurpose;
  location: string, 
  status: DocumentStatus, 
  metadata: any, 
  organization: any,
  verificationResponse: any,
}

export interface DocumentStatusProps {
  status: DocumentStatus,
}

export interface DocumentStatusProps {
  status: DocumentStatus,
}

export class DocumentEntity extends AggregateRoot<DocumentProps> {
  protected readonly _id: UUID;

  static create(create: DocumentProps): DocumentEntity {
    const id = UUID.generate();
    const props: DocumentProps = { ...create };
    const Document = new DocumentEntity({ id, props });
    return Document;
  }

  static update(update: DocumentProps): DocumentEntity {
    const id = update.id;
    const props: DocumentProps = { ...update };
    const Document = new DocumentEntity({ id, props });
    return Document;
  }

  public validateEntity(): void {
    // if (Guard.isEmpty(this.props.legalName)) {
    //   throw new MinDocumentLegalnameException();
    // }
  }
  public validate(): void {}
}
