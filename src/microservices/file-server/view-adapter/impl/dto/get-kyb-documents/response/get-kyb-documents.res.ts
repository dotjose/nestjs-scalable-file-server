import { ApiExtraModels } from "@nestjs/swagger";
import { DocumentDto } from "../../common/document.dto";
import { Status } from '../../common/status.dto';

@ApiExtraModels(DocumentDto)
@ApiExtraModels(Status)
export class GetKybDocumentsResponse {
  constructor(protected readonly responseBody: DocumentDto) {}
}
