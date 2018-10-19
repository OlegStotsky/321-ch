import { IBoardCredentials } from "../../../shared/lib/types/BoardCredentials";
import { IFile } from "../../../shared/lib/types/File";

export default interface ISendThreadDTO {
  authorName: string;
  subject: string;
  content: string;
  file: IFile;
}
