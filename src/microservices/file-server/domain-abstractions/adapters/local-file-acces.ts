import { downloadFromFtp, moveToFtp } from "@file-server/infrastructure/ftp/ftp-helper";
import { LocalFileAccessPort } from "@file-server/ports/local-file-access/local-file-access.port";
import { Injectable } from "@nestjs/common";

@Injectable()
export class LocalFileAccess implements LocalFileAccessPort {
  protected relations: string[] = [];

  constructor() {}
  strToPath(text: string): string {
    text = text.toLowerCase().replace(/[^a-z]/g, "");
    return `${text.charAt(0)}/${text.charAt(1)}/${text.length}/${text}`;
  }

  readLocalFile(location: string): Promise<string> {
    throw new Error("Method not implemented.");
  }

  async moveToFtp(source: string, destination: string): Promise<boolean> {
    return await moveToFtp(source, destination);
  }

  async downloadFromFtp(source: string) {
    return await downloadFromFtp(source);
  }


}
