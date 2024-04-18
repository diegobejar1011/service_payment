import { SendMessageService } from "../../shared/broker/application/services/sendMessage";
import { QueueName } from "../../shared/broker/domain/entities";
import { SendDataService } from "../../shared/socket/application/sendDataService";
import { Events } from "../../shared/socket/domain/entities/events";

export class CreatePaymentService {
    constructor(private readonly sendMessageService : SendMessageService, private readonly sendDataService : SendDataService) {}
    async execute(order: any) : Promise<void> {
        try {

            const total = order.price * order.amount;
            const payment = {
               product: order.product,
               amount: order.amount,
               price: order.price,
               total: total
            };

            await this.sendMessageService.execute(payment, QueueName.BACKUP);
            await this.sendDataService.execute(Events.SEND_DATA, payment);
        } catch (error: any) {
            throw new Error(error);
        }
    }
}