import axios from "axios";
import { array } from "@mojotech/json-type-validation";
import { IBoardCredentials } from "../../../shared/lib/types/BoardCredentials";
import { IThread, threadDecoder } from "./Thread";
import { postDecoder } from "./Post";

export default class ApiAdapter {
  public static getThread(
    boardCredentials: IBoardCredentials,
    threadNumber: number
  ): Promise<IThread> {
    return axios
      .get(`/api/${boardCredentials.shortName}/${threadNumber}`)
      .then(response => response.data)
      .then(thread => threadDecoder.runWithException(thread));
  }

  public static getThreads(
    boardCredentials: IBoardCredentials
  ): Promise<IThread[]> {
    return axios
      .get(`/api/${boardCredentials.shortName}`)
      .then(response => response.data)
      .then(threads => array(threadDecoder).runWithException(threads));
  }

  public static sendPost(
    boardCredentials: IBoardCredentials,
    threadNumber: number,
    authorName: string,
    content: string
  ) {
    const post = {
      authorName,
      content
    };
    return axios
      .post(`/api/${boardCredentials.shortName}/${threadNumber}`, post)
      .then(response => response.data)
      .then(newPost => postDecoder.runWithException(newPost));
  }

  public static sendThread(
    boardCredentials: IBoardCredentials,
    authorName: string,
    subject: string,
    content: string
  ) {
    const opPost = {
      opPostAuthor: authorName,
      opPostSubject: subject,
      opPostContent: content
    };
    return axios
      .post(`/api/${boardCredentials.shortName}`, opPost)
      .then(response => response.data)
      .then(p => postDecoder.runWithException(p));
  }
}
