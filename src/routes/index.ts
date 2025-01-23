import { Router } from "express";
import taskRouter from "./task";

const baseRouter: Router = Router();

baseRouter.use("/tasks", taskRouter);

export default baseRouter;
