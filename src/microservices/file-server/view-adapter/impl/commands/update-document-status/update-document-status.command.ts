import {
  Command,
  CommandProps,
} from "@shared-libraries/core/ddd/domain/base-classes/command.base";

export class UpdateDocumentStatusCommand extends Command {
  constructor(props: CommandProps<UpdateDocumentStatusCommand>) {
    super(props);
    this.documentId = props.documentId,
    this.status = props.status
  }
  public readonly documentId: string;
  public readonly status: string;

}
