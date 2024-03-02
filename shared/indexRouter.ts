import { Router, Request, Response } from 'express';
import paymentRouter from '../payment/infraestructure/paymentRouter';

export const indexRouter = Router();

indexRouter.use("/api/payment", paymentRouter);

indexRouter.get("/", (req: Request, res: Response) => {
    res.status(200).send('Service Payment');
});
