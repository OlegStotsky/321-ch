import axios from "axios";
import { array } from "@mojotech/json-type-validation";
import { IBoardCredentials } from "../../../shared/lib/types/BoardCredentials";
import { IThread, threadDecoder } from "./Thread";

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
}
