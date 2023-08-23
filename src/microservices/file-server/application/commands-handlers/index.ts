import { UploadDocumentHandler } from "./upload-document-handler";
import { UpdateDocumentStatusCommandHandler } from './update-document-status';

export const COMMAND_HANDLERS = [
   UploadDocumentHandler,
   UpdateDocumentStatusCommandHandler
];
