import { QueueName, QueueContent } from "./index";

export class QueueRequest {
    constructor (readonly queueName: QueueName, readonly content: QueueContent) {}
}