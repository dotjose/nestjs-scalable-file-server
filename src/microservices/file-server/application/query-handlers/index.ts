import { DownloadDocumentQueryHandler } from "./download-document";
import { GetDocumentsQueryHandler } from "./get-documents";
import { GetDocumentVerificationQueryHandler } from "./get-document-verification";

export const QUERY_HANDLERS = [
    DownloadDocumentQueryHandler,
    GetDocumentsQueryHandler,
    GetDocumentVerificationQueryHandler
];
