import { DomainEvent, DomainEventProps } from '@shared-libraries/core/ddd/domain/domain-events';

export class KybDomainEvent extends DomainEvent {
  constructor(props: DomainEventProps<KybDomainEvent>) {
    super(props);
    this.name = props.name;
    this.street = props.street;
    this.country = props.country;
    this.regNumber = props.regNumber;
  }

  readonly name: string;

  readonly street: string;

  readonly country: string;

  readonly regNumber: string;
}
