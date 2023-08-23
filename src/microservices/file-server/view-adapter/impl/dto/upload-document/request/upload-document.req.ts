import { DocumentPurpose, DocumentStatus, DocumentTypes } from "@file-server/model/enum/business.enum";
import { AutoMap } from "@automapper/classes";
import { ApiProperty } from "@nestjs/swagger";

export class UploadDocumentReq {

  @AutoMap()
  @ApiProperty({ default: 1 })
  public organization: string;

  @ApiProperty()
  public organizationName: string;
  
  @AutoMap()
  @ApiProperty({ default: DocumentPurpose.KYB })
  public purpose: DocumentPurpose;

  @AutoMap()
  @ApiProperty({ default: DocumentStatus.PENDING,required:false })
  public status: DocumentStatus;

  @AutoMap()
  @ApiProperty({ default: DocumentTypes.ID_BACK_SIDE })
  public documentType: DocumentTypes;

  @AutoMap()
  @ApiProperty({ type: 'file', format: 'binary', required: false })
  public file: string;

  @AutoMap()
  @ApiProperty()
  public metadata: string;

  public name: string;

  public location: string;

  public docId: string;


  
}
