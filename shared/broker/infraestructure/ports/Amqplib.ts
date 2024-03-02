import amqp  from "amqplib";
import { BrokerRepository } from "../../domain/repositories/brokerRepository";
import { Connection } from "amqplib/callback_api";
import { Channel } from "amqplib/callback_api";
import { QueueRequest } from '../../domain/entities/QueueRequest';

export class AmqpRepository implements BrokerRepository {
    constructor(private readonly url: string) {}

    async connection(): Promise<any> {
        return new Promise<Connection>((resolve, reject) => {
            amqp.connect(this.url, (error: any, connection : Connection) => {
                if(error) reject(error);
                resolve(connection);
            });
        });
    }

    async createChannel(): Promise<any> {
        const connection = await this.connection();
        return new Promise<Channel>((resolve, reject) => {
            connection.createChannel((errorChannel: any, channel: Channel) => {
                if(errorChannel) reject(errorChannel);
                resolve(channel);
            });
        });
    }

    async sendMessage(req: QueueRequest): Promise<void> {
        const { queueName, content } = req;
        try {
            const channel = await this.createChannel();
            await channel.assertQueue(queueName);
            channel.sendToQueue(queueName, Buffer.from(JSON.stringify(content)), {
                persistent: true
            });
        } catch (error: any) {
            throw new Error(error);
        }
    }
}