import path from "path";
import express, { Application, Request, Response } from "express";
import { logger } from "../config/winston";
import asyncErrors from "../middleware/asyncErrors";

export default (app: Application) => {
  const distPath = path.join(__dirname, "..", "..", "..", "client", "dist");
  const staticPath = path.join(__dirname, "..", "..", "static");
  app.use(express.static(distPath));

  app.get(
    "*",
    asyncErrors((req: Request, res: Response) => {
      res.sendFile(path.join(distPath, "index.html"));
    })
  );

  logger.info("Initialized static content");
};
