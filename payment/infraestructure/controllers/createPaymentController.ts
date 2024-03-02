import { CreatePaymentService } from "../../application/createPaymentService";
import { Request, Response, Send } from "express";

export class CreatePaymentController {
    constructor(private readonly createPaymentService : CreatePaymentService) {}
    async execute(req: Request, res: Response) {
        try {
            const order = req.body;
            const result = await this.createPaymentService.execute(order);
            res.status(200).json(result);
        } catch (error: any) {
            return res.status(500).send(error.message)
        }
    }
}