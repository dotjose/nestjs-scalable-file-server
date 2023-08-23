import { ApiProperty } from "@nestjs/swagger";
import { IsEnum } from "class-validator";
import { IDto } from "shared-libraries/application-core/domain-business/views/dto.interface";

export enum OperationStatus {
    DONE = "done",
    IN_PROGRESS = "in_progress",
    ERROR = "error",
    UNKNOWN = "unknown",
    CANCELED = "canceled",
    VALIDATION_FAIL = "validation_fail",
    UNAUTHORIZED = "unauthorized",
  }
  
  export class Status implements IDto {
    
    @ApiProperty()
    public  isError: boolean;
  
    @ApiProperty()
    public  code: number;
  
    @ApiProperty()
    public  description: string;
  
    @IsEnum(OperationStatus)
    @ApiProperty({
      enum: [
        "done",
        "in_progress",
        "error",
        "unknown",
        "canceled",
        "validation_fail",
        "unauthorized",
      ],
    })
    public readonly type: OperationStatus;
  
    @ApiProperty()
    public readonly timestamp: Date;
  }