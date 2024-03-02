import { AmqpRepository } from "../../shared/broker/infraestructure/ports/amqplib";
import { SendMessageService } from "../../shared/broker/application/services/sendMessage";
import { CreatePaymentService } from "../application/createPaymentService";
import { CreatePaymentController } from "./controllers/createPaymentController";
import { SocketioRepository } from "../../shared/socket/infraestructure/ports/socketioRepository";
import { SendDataService } from "../../shared/socket/application/sendDataService";

const amqplib = new AmqpRepository("///");
const socketio = new SocketioRepository("///");

const sendMessageService = new SendMessageService(amqplib);
const sendDataService = new SendDataService(socketio);

const createPaymentService = new CreatePaymentService(sendMessageService, sendDataService);

export const createPaymentController = new CreatePaymentController(createPaymentService);


