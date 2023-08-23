import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Injectable, Logger } from '@nestjs/common'; 
import { Mapper } from "@automapper/core";
import { InjectMapper } from "@automapper/nestjs";
import { NotFoundException } from '@exceptions';
import {
  TypeormRepositoryBase,
  WhereCondition,
} from '@shared-libraries/core/ddd/infrastructure/database/base-classes/typeorm.repository.base';
import { QueryParams } from '@shared-libraries/core/ddd/domain/ports/repository.ports';   
import { DocumentOrmMapper } from '@infrastructure/mapper/document.orm-mapper';
import { DocumentEntity, DocumentProps } from '@model/entity';
import { DocumentRepositoryPort } from '@ports/repository/document.repository.port';
import { removeUndefinedProps } from '@shared-libraries/core/utils/remove-undefined-props.util';
import { GetDocumentsQuery } from '@file-server/view-adapter/impl/queries/impl/get-documents.query';
import { DocumentOrmEntity } from '../data/entities/common/documents.entity';
 
@Injectable()
export class DocumentRepository
  extends TypeormRepositoryBase<DocumentEntity, DocumentProps, DocumentOrmEntity>
  implements DocumentRepositoryPort {
  protected relations: string[] = [];

  constructor(
    @InjectRepository(DocumentOrmEntity)
    private readonly documentRepository: Repository<DocumentOrmEntity>,
    @InjectMapper() private autoMapper: Mapper
  ) {
    super(
      documentRepository,
         new DocumentOrmMapper(
        DocumentEntity,
        DocumentOrmEntity,
        autoMapper
      ),
      new Logger('DocumentRepository'),
    );
  }

  private async findOneById(id: string): Promise<DocumentOrmEntity | undefined> {
    const document = await this.documentRepository.findOne({
      where: { id },
    });

    return document;
  }

  async findDocByStatus(purpose: string, status: string): Promise<DocumentProps[] | undefined> {
    console.log(purpose, status);
    const documents = await this.documentRepository.find({ where: { purpose, status } });
    console.log(documents);
     return documents.map(document => this.mapper.toDomainEntity(document).getPropsCopy());
  }

  async findOneByIdOrThrow(id: string): Promise<DocumentEntity> {
    const document = await this.findOneById(id);
    if (!document) {
      throw new NotFoundException(`Document with id '${id}' not found`);
    }
    return this.mapper.toDomainEntity(document);
  }

  private async findOneBylegalName(
    legalName: string,
  ): Promise<DocumentOrmEntity | undefined> {
    const document = await this.documentRepository.findOne({
      where: { legalName },
    });

    return document;
  }

  async findOneBylegalNameOrThrow(legalName: string): Promise<DocumentEntity> {
    const document = await this.findOneBylegalName(legalName);
    if (!document) {
      throw new NotFoundException(`Document with legalName '${legalName}' not found`);
    }
    return this.mapper.toDomainEntity(document);
  }
  async findDocuments(query: GetDocumentsQuery): Promise<DocumentProps[]> {
    const where: QueryParams<DocumentOrmEntity> = removeUndefinedProps(query);
    const documents = await this.repository.find({ where });
    return documents.map(document => this.mapper.toDomainEntity(document).getPropsCopy());
  }
  async findMany(): Promise<DocumentEntity[]> {
    const documents = await this.findMany();
     // todo mapping
    return documents as DocumentEntity[];
  }
  async exists(legalName: string): Promise<boolean> {
    // const found = await this.findOneBylegalName(legalName);
    // if (found) {
    //   return true;
    // }
    return false;
  }
 
  protected prepareQuery(
    params: QueryParams<DocumentProps>,
  ): WhereCondition<DocumentOrmEntity> {
    const where: QueryParams<DocumentOrmEntity> = {};
    
    return where;
  }

  getMapper() {
    return this.autoMapper;
  }

}
