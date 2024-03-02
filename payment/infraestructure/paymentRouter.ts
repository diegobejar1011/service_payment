import { createPaymentController } from "./dependencies";
import { Router } from "express";

const paymentRouter = Router();

paymentRouter.post("/", createPaymentController.execute.bind(createPaymentController));

export default paymentRouter;