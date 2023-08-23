import { ApiProperty } from "@nestjs/swagger";
import { IDto } from "shared-libraries/application-core/domain-business/views/dto.interface";
import { DocumentPurpose, DocumentStatus, DocumentTypes } from "@model/enum/business.enum";

export class DocumentDto implements IDto{
    @ApiProperty()
    public purpose: DocumentPurpose[]; 

    @ApiProperty()
    public name: string;

    @ApiProperty()
    public documentType: DocumentTypes;  

    @ApiProperty()
    public location: string; 

    @ApiProperty()
    public status: DocumentStatus; 
  
    @ApiProperty()
    public metadata: string; 

    @ApiProperty()
    public verificationResponse: any;
}