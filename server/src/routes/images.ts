import path from "path";
import { Router, Request, Response } from "express";
import { logger } from "../config/winston";
import config from "../config/config";
import asyncErrors from "../middleware/asyncErrors";

const router: Router = Router();

const { STATIC_FOLDER_PATH: staticPath } = config;

router.get(
  "/:imageName",
  asyncErrors((req: Request, res: Response) => {
    logger.debug(path.join(staticPath, req.params.imageName));
    res.sendFile(path.join(staticPath, req.params.imageName));
  })
);

export default router;
