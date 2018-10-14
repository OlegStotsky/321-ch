import { IBoardCredentials } from "../../../shared/lib/types/BoardCredentials";
import { IFile } from "../../../shared/lib/types/File";

export default interface ISendPostDTO {
  authorName: string;
  content: string;
  file: IFile;
}
