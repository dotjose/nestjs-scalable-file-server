import { ExceptionBase } from "@exceptions";
import { ExceptionCodes } from "@shared-libraries/core/exceptions/exception.codes";

export class DocumentNotFoundException extends ExceptionBase {
  internalCode: string;
  constructor(message = "Document Not Found") {
    super(message);
  }

  readonly code = ExceptionCodes.conflict;
}
