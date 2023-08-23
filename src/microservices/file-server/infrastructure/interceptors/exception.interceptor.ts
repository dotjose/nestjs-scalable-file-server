import {
  CallHandler,
  ExecutionContext,
  NestInterceptor,
  // To avoid confusion between internal app exceptions and NestJS exceptions
  ConflictException as NestConflictException,
  NotFoundException as NestNotFoundException,
} from "@nestjs/common";
import { Observable } from "rxjs";
import { catchError } from "rxjs/operators";
import {
  ExceptionBase,
  NotFoundException,
} from "@shared-libraries/core/exceptions";

export class ExceptionInterceptor implements NestInterceptor {
  intercept(
    _context: ExecutionContext,
    next: CallHandler
  ): Observable<ExceptionBase> {
    return next.handle().pipe(
      catchError((err) => {
        /**
         * Custom exceptions are converted to nest.js exceptions.
         * This way we are not tied to a framework or HTTP protocol.
         */
        if (err instanceof NotFoundException) {
          throw new NestNotFoundException(err.message);
        }

        throw new NestConflictException(err.message);
      })
    );
  }
}
