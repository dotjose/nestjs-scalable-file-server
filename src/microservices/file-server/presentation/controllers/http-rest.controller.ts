import { Body, Controller, Get, HttpException, HttpStatus, Param, Post, Res, UploadedFile, UseInterceptors, Put } from "@nestjs/common";
import { CommandBus, QueryBus } from '@nestjs/cqrs'
import {
  ApiConsumes,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger'
import { Result } from "@badrap/result";

import { ID } from "@shared-libraries/core/ddd/domain/value-objects/id.value-object";
import { IdResponse } from "@shared-libraries/core/ddd/interface-adapters/dtos/id.response.dto";
import { UploadDocumentReq } from "@file-server/view-adapter/impl/dto/upload-document";
import { UploadDocumentCommand } from "@file-server/view-adapter/impl/commands/upload-document";
import { FileInterceptor } from '@nestjs/platform-express';
import { storage } from "@shared-config/app/storage.config";
import { GetDocumentsQuery } from "@file-server/view-adapter/impl/queries/impl/get-documents.query";
import { GetKybDocumentsResponse } from "@file-server/view-adapter/impl/dto/get-kyb-documents";
import { DownloadDocumentQuery } from "@file-server/view-adapter/impl/queries/impl/download-document.query";
import { createReadStream } from 'fs';
import { join } from "path";

import { GetDocumentVerificationQuery } from "@file-server/view-adapter/impl/queries/impl/get-document-verification";
import { UpdateDocumentStatusReq } from "@file-server/view-adapter/impl/dto"
import { UpdateDocumentStatusCommand } from "@file-server/view-adapter/impl/commands/update-document-status";
import { DocumentProps } from "@file-server/model/entity";

@Controller('file-server')
@ApiTags('file-server')
export class HttpRestController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus
  ) { }

  @ApiOperation({ summary: 'upload-document' })
  @ApiResponse({
    status: HttpStatus.OK,
    type: IdResponse,
  })
  @ApiResponse({
    status: HttpStatus.FORBIDDEN,
  })
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor(
    'file', {
    storage,
    fileFilter: (req: Request, file, cb) => {
      const ext = file.mimetype;
      if (['application/pdf', 'image/png', 'image/jpeg', 'image/jpg'].indexOf(ext) == -1) {
        return cb(new Error(ext + ' type not allowed'), false); // FileIntercepter is completely ignoring this.
      }
      return cb(null, true);
    }
  },
  ))
  @Post('upload-document')
  public async uploadDocument(
    @Body() dto: UploadDocumentReq,
    @UploadedFile() file?: Express.Multer.File,
  ): Promise<IdResponse> {
    dto.name = file?.filename || 'nofile'
    dto.location = file?.path
    const result: Result<ID, any> = await this.commandBus.execute(
      new UploadDocumentCommand(dto),
    )

    return result.unwrap(
      (id) => new IdResponse(id.value),
      (error) => {
        throw new HttpException(error.message, HttpStatus.FORBIDDEN)
      },
    )
  }

  @ApiOperation({ summary: "reupload document" })
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor(
    'file', {
    storage,
    fileFilter: (req: Request, file, cb) => {
      const ext = file.mimetype;
      if (['application/pdf', 'image/png', 'image/jpeg', 'image/jpg'].indexOf(ext) == -1) {
        return cb(new Error(ext + ' type not allowed'), false); // FileIntercepter is completely ignoring this.
      }
      return cb(null, true);
    }
  },
  ))
  @Put('update-document/:docId')
  public async updateDocument(
    @Body() dto: UploadDocumentReq,
    @Param("docId") docId: string,
    @UploadedFile() file?: Express.Multer.File,
  ): Promise<DocumentProps> {
    dto.name = file?.filename || 'nofile'
    dto.location = file?.path
    dto.docId = docId
    const result: Result<DocumentProps, any> = await this.commandBus.execute(
      new UploadDocumentCommand(dto),
    )

    return result.unwrap(
      (result) => result,
      (error) => {
        throw new HttpException(error.message, HttpStatus.FORBIDDEN)
      },
    )
  }

  @ApiOperation({ summary: "download-document by id" })
  @ApiResponse({
    status: HttpStatus.OK,
    type: GetKybDocumentsResponse,
  })
  @Get("download-document/:id")
  public async downloadDocument(@Param('id') id: string, @Res() response: any) {

    const result = await this.queryBus.execute(
      new DownloadDocumentQuery(id)
    );
    let source = result.unwrap()

    if(source === undefined || source === null) return "This file doesn't exist."

    let filename = source.substring(source.lastIndexOf('/') + 1);
    response.set({
      'Content-Disposition': 'attachment; filename="' + filename + '"',
    });

    const file = createReadStream(join(process.cwd(), source));
    file.pipe(response);
  }

  @ApiOperation({ summary: "get-documents" })
  @ApiResponse({
    status: HttpStatus.OK,
    type: GetKybDocumentsResponse,
  })
  @Get("get-documents/:purpose/:organization")
  public async getUploadedDocument(@Param('purpose') purpose: string, @Param('organization') organization: string): Promise<GetKybDocumentsResponse[]> {
    const result: Result<any[]> = await this.queryBus.execute(
      new GetDocumentsQuery({ purpose, organization })
    );

    return result.unwrap(result => result)
  }

  @ApiOperation({ summary: "Get kyb verification response data" })
  @ApiResponse({
    status: HttpStatus.OK,
  })
  @ApiResponse({
    status: HttpStatus.BAD_GATEWAY,
  })
  @Get("documents/:id/:tenantId/:organization")
  public async getDocumentVerification(@Param('id') id: string, @Param('tenantId') tenantId: string, @Param('organization') organization: string): Promise<any> {
    const result: Result<any> = await this.queryBus.execute(
      new GetDocumentVerificationQuery({ id, tenantId, organization })
    );
    return result.unwrap(result => result)
  }

  @ApiOperation({ summary: "Update kyb document status" })
  @ApiResponse({
    status: HttpStatus.OK,
  })
  @ApiResponse({
    status: HttpStatus.BAD_GATEWAY,
  })
  @Put("documents/:id")
  public async updateDocumentStatus(@Param('id') id: string, @Body() statusReq: UpdateDocumentStatusReq) {
    const documentStatus = {
      documentId: id,
      status: statusReq.status
    }

    const result: Result<{}, any> = await this.commandBus.execute(
      new UpdateDocumentStatusCommand(documentStatus),
    )

    return result.unwrap(
      (result) => result,
      (error) => {
        throw new HttpException(error.message, HttpStatus.FORBIDDEN)
      },
    )
  }
}

