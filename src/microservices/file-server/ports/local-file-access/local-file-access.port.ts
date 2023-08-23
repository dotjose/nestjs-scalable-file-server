 
export interface LocalFileAccessPort {
  readLocalFile(location: string): Promise<string>;
  strToPath(str: string): string;
  moveToFtp(source: string, destination:string): Promise<boolean>;
}
export const LocalFileAccessPort = Symbol("LocalFileAccessPort");