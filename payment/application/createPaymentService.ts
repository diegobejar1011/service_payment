import { SendMessageService } from "../../shared/broker/application/services/sendMessage";
import { QueueName } from "../../shared/broker/domain/entities";
import { SendDataService } from "../../shared/socket/application/sendDataService";
import { Events } from "../../shared/socket/domain/entities/events";
import { Payment } from "../domain/entities/payment";

export class CreatePaymentService {
    constructor(private readonly sendMessageService : SendMessageService, private readonly sendDataService : SendDataService) {}
    async execute(order: any) : Promise<Payment> {
        try {
            console.log('Inicio del servicio');
            const total = order.price * order.amount;
            console.log('Total: ' + total);
            const payment = {
               product: order.product,
               amount: order.amount,
               price: order.price,
               total: total
            };
            console.log(payment);
            await this.sendMessageService.execute(payment, QueueName.BACKUP);
            await this.sendDataService.execute(Events.SEND_DATA, payment);
            return payment;
        } catch (error: any) {
            throw new Error(error);
        }
    }
}