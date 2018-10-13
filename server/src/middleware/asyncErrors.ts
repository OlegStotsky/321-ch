import { Request, Response, NextFunction } from "express";
import { badImplementation } from "boom";
import { logger } from "../config/winston";

export default (fn: any) => (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  Promise.resolve(fn(req, res, next)).catch((err: any) => {
    if (!err.isBoom) {
      logger.debug("I was here ", err);
      return next(badImplementation(err));
    }
    logger.debug("I was there ", err);
    next(err);
  });
};
