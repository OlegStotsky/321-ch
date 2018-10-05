import {
  Decoder,
  object,
  string,
  optional,
  number
} from "@mojotech/json-type-validation";

export interface IPost {
  date: number;
  postNumber: number;
  authorName: string;
  content: string;
  subject?: string;
  imageName?: string;
  image?: string;
}

export const postDecoder: Decoder<IPost> = object({
  date: number(),
  postNumber: number(),
  authorName: string(),
  content: string(),
  subject: optional(string()),
  imageName: optional(string()),
  image: optional(string())
});
