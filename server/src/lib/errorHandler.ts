import { AppError } from "./appError";
import { logger } from "../config/winston";

export const errorHandler = (error: AppError) => {
    if (error.isOperational) {
        logger.warn(error.message);
    } else {
        logger.error(error.message);
    }
};