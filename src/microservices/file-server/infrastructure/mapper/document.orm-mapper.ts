
import { DocumentOrmEntity } from "@file-server/domain-abstractions/data/entities/common/documents.entity";
import { DocumentEntity, DocumentProps } from "@model/entity";
import { UUID } from "@shared-libraries/core/ddd/domain/value-objects/uuid.value-object";
import {
  EntityProps,
  OrmEntityProps,
  OrmMapper,
} from "@shared-libraries/core/ddd/infrastructure/database/base-classes/orm-mapper.base";

export class DocumentOrmMapper extends OrmMapper<
  DocumentEntity,
  DocumentOrmEntity
> {
  protected toOrmProps(
    entity: DocumentEntity
  ): OrmEntityProps<DocumentOrmEntity> {
    const props = entity.getPropsCopy();

    const ormProps: OrmEntityProps<DocumentOrmEntity> = {
      purpose: props.purpose,
      documentType: props.documentType,
      name: props.name,
      location: props.location, 
      status: props.status, 
      metadata: props.metadata, 
      organization: props.organization,
      verificationResponse: props.verificationResponse,
      tenantId: "1"
      //privateCustomer: props.privateCustomer
    };
    return ormProps;
  }

  protected toDomainProps(
    ormEntity: DocumentOrmEntity
  ): EntityProps<DocumentProps> {
    const id = new UUID(ormEntity.id);
    const props: DocumentProps = {
      purpose: ormEntity.purpose,
      name: ormEntity.name,
      documentType: ormEntity.documentType,
      id: id,
      location: ormEntity.location, 
      status: ormEntity.status, 
      metadata: ormEntity.metadata, 
      organization: ormEntity.organization, 
      verificationResponse: ormEntity.verificationResponse, 
      //privateCustomer: ormEntity.privateCustomer
    };
    return { id, props };
  }
}
