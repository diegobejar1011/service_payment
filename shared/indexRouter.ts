import { Router, Request, Response } from 'express';
import paymentRouter from '../payment/infraestructure/paymentRouter';

export const indexRouter = Router();

indexRouter.use("/api/payment", paymentRouter);
