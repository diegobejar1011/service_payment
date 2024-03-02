import { QueueRequest } from "../entities";

export interface BrokerRepository {
    connection() : Promise<any>;
    createChannel(): Promise <any>;
    sendMessage(req: QueueRequest) : Promise<void>;
}