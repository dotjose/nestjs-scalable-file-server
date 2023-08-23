import { ExceptionBase } from "@exceptions";
import { ExceptionCodes } from "@shared-libraries/core/exceptions/exception.codes";

export class ServerErrorException extends ExceptionBase {
  internalCode: string;
  constructor(message = "Unable to verify this organization this time. Internal Server error.") {
    super(message);
  }

  readonly code = ExceptionCodes.conflict;
}
