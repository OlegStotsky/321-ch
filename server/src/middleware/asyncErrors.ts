import { Request, Response, NextFunction } from "express";
import { badImplementation } from "boom";
import { logger } from "../config/winston";

export default (fn: any) => async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await fn(req, res, next);
  } catch (e) {
    if (!e.isBoom) {
      next(badImplementation(e));
    }

    next(e);
  }
};
