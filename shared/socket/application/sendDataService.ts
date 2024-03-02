import { QueueContent } from "../../broker/domain/entities";
import { Events } from "../domain/entities/events";
import { SocketRepository } from "../domain/repositories/socketRepository";

export class SendDataService {
    constructor(private readonly socketRepository: SocketRepository) {}
    async execute(eventEmint: Events, data: QueueContent) {
        try {
            await this.socketRepository.sendData(eventEmint, data);
        } catch ( error : any) {
            throw new Error(error);
        }
    }
}