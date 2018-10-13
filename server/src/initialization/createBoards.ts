import Board from "../models/Board";
import BoardName from "../../../shared/lib/types/BoardName";
import { logger } from "../config/winston";

export default async () => {
  await Promise.all(
    Object.keys(BoardName).map(key => {
      Board.find({ name: BoardName[key as any] })
        .then(board => {
          return Board.create({ name: BoardName[key as any] });
        })
        .catch(e => {
          logger.silly(e);
        });
    })
  );

  logger.info("Initialized boards");
};
