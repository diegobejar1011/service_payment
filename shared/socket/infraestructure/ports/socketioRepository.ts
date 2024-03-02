import { Socket, io } from "socket.io-client";
import { Payment } from "../../../../payment/domain/entities/payment";
import { Events } from "../../domain/entities/events";
import { SocketRepository } from "../../domain/repositories/socketRepository";

export class SocketioRepository implements SocketRepository {
    constructor(private readonly url : string ) {};

    async connect(): Promise<any> {
        return new Promise<Socket> ((resolve, reject) => {
            try {
                const socket = io(this.url);
                resolve(socket);
            } catch (error: any ) {
                reject(error);
            }
        })
    }

    async sendData(eventEmit: Events, data: Payment): Promise<void> {
        
    }

    

}