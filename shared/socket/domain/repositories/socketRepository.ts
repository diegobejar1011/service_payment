import { QueueContent } from "../../../broker/domain/entities";
import { Events } from "../entities/events";

export interface SocketRepository {
    connect(): Promise<any>;
    sendData(eventEmit: Events, data: QueueContent) : Promise<void>
}