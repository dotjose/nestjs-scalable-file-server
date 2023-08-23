import { DocumentStatus } from "@file-server/domain-abstractions/data/enum/business.enum";
import { DocumentPurpose, DocumentTypes } from "@file-server/model/enum/business.enum";
import {
  Command,
  CommandProps,
} from "@shared-libraries/core/ddd/domain/base-classes/command.base";

export class UploadDocumentCommand extends Command {
  constructor(props: CommandProps<UploadDocumentCommand>) {
    super(props);
    Object.assign(this, props);
  }

  public readonly organization: string;
  
  public readonly organizationName: string;

  public readonly purpose: DocumentPurpose;
  
  public readonly status?: DocumentStatus;

  public readonly documentType: DocumentTypes;

  public readonly name: string;

  public readonly location: string;

  public readonly metadata: string;

  public docId?: string;
}
