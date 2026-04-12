import { Router, type IRouter } from "express";
import healthRouter from "./health";
import blogsRouter from "./blogs";

const router: IRouter = Router();

router.use(healthRouter);
router.use(blogsRouter);

export default router;
