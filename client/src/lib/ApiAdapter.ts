import axios from "axios";
import { array } from "@mojotech/json-type-validation";
import { IBoardCredentials } from "../../../shared/lib/types/BoardCredentials";
import { IThread, threadDecoder } from "./Thread";
import { postDecoder } from "./Post";
import { IFile } from "../../../shared/lib/types/File";
import ISendThreadDTO from "./SendThreadDTO";
import ISendPostDTO from "./SendPostDTO";

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
    sendPostDTO: ISendPostDTO
  ) {
    const { shortName } = boardCredentials;
    return axios
      .post(`/api/${boardCredentials.shortName}/${threadNumber}`, sendPostDTO)
      .then(response => response.data)
      .then(newPost => postDecoder.runWithException(newPost));
  }

  public static sendThread(
    boardCredentials: IBoardCredentials,
    sendThreadDTO: ISendThreadDTO
  ) {
    const { shortName } = boardCredentials;
    return axios
      .post(`/api/${shortName}`, sendThreadDTO)
      .then(response => response.data)
      .then(p => postDecoder.runWithException(p));
  }
}
