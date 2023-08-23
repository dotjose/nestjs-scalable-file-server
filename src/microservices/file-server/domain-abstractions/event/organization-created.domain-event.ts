import { DomainEvent, DomainEventProps } from '@shared-libraries/core/ddd/domain/domain-events';




export class OrganizationCreatedDomainEvent extends DomainEvent {
  constructor(props: DomainEventProps<OrganizationCreatedDomainEvent>) {
    super(props);
    this.email = props.email;
    this.country = props.country;
    this.postalCode = props.postalCode;
    this.street = props.street;
  }

  readonly email: string;

  readonly country: string;

  readonly postalCode: string;

  readonly street: string;
}
