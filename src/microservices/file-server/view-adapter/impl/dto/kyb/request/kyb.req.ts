import { AutoMap } from "@automapper/classes";
import { ApiProperty } from "@nestjs/swagger";

export class KybReq {
  @AutoMap()
  @ApiProperty()
  public readonly name: string;
  @AutoMap()
  @ApiProperty()
  public readonly street: string;
  @AutoMap()
  @ApiProperty()
  public readonly country: string;

  @AutoMap()
  @ApiProperty()
  public readonly regNumber: string;
}
