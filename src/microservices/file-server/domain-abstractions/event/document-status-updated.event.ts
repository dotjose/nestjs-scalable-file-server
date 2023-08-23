import { DocumentProps } from "@file-server/model/entity";

export class DocumentStatusUpdatedDomainEvent {
  constructor(props: DocumentProps) {
    this.documents = props;
  }
  readonly documents: DocumentProps
}