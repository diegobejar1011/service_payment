import { SendMessageService } from "../../shared/broker/application/services/sendMessage";
import { QueueName } from "../../shared/broker/domain/entities";
import { SendDataService } from "../../shared/socket/application/sendDataService";
import { Events } from "../../shared/socket/domain/entities/events";

export class CreatePaymentService {
    constructor(private readonly sendMessageService : SendMessageService, private readonly sendDataService : SendDataService) {}
    async execute(order: any) : Promise<void> {
        try {
            const payment = {
                id: Math.random().toString(36).substr(2, 18),
                ...order
            };
            await this.sendMessageService.execute(payment, QueueName.PAYMENT);
            await this.sendDataService.execute(Events.SEND_DATA, payment);
        } catch (error: any) {
            throw new Error(error);
        }
    }
}