import { Decoder, object, array } from "@mojotech/json-type-validation";
import { IPost, postDecoder } from "./Post";

export interface IThread {
  opPost: IPost;
  posts: IPost[];
}

export const threadDecoder: Decoder<IThread> = object({
  opPost: postDecoder,
  posts: array(postDecoder)
});
