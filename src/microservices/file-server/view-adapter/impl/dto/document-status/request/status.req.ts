
import { AutoMap } from "@automapper/classes";
import { ApiProperty } from "@nestjs/swagger";
import { DocumentStatus } from "@file-server/model/enum/business.enum";

export class UpdateDocumentStatusReq {
  @AutoMap()
  @ApiProperty()
  public readonly status: DocumentStatus;
}
