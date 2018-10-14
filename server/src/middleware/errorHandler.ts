import { Request, Response, NextFunction } from "express";
import { badImplementation } from "boom";
import { logger } from "../config/winston";

export default (err: any, req: Request, res: Response, next: NextFunction) => {
  if (!err.isBoom) {
    err = badImplementation(err);
  }
  logger.debug(err);
  if (err.isServer) {
    logger.error(err.message);
  }

  res.status(err.output.statusCode).json(err.output.payload);
};
