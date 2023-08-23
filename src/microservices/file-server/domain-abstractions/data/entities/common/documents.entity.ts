 
import { Column,Entity,PrimaryGeneratedColumn } from "typeorm"; 
import { DocumentPurpose, DocumentTypes, DocumentStatus } from "../../enum/business.enum";
import { TypeormEntityBase } from '@shared-libraries/core/ddd/infrastructure/database/base-classes/typeorm.entity.base';
//import { PrivateCustomerOrmEntity } from "../person/private-customer.entity";

@Entity({ name: "Documents" }) 
export class DocumentOrmEntity extends TypeormEntityBase {
  @PrimaryGeneratedColumn("uuid")
  public id: string;

  @Column({ name: "purpose", default:DocumentPurpose.KYB })
  public purpose: DocumentPurpose;

  @Column({ name: "name" })
  public name: string;

  @Column({ name: "documentType", default:DocumentTypes.ID_BACK_SIDE })
  public documentType: DocumentTypes;

  @Column({ name: "location" })
  public location: string;

  @Column({ name: "status", default:DocumentStatus.PENDING })
  public status: DocumentStatus;

  @Column({type:'text'})
  public metadata: string;

  @Column()
  organization: string;

  @Column({ name: "verificationResponse", nullable: true })
  verificationResponse: string;

  //privateCustomer: PrivateCustomerOrmEntity;
 
}
