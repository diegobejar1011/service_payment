import { AmqpRepository } from "../../shared/broker/infraestructure/ports/Amqplib";
import { SendMessageService } from "../../shared/broker/application/services/sendMessage";
import { CreatePaymentService } from "../application/createPaymentService";
import { CreatePaymentController } from "./controllers/createPaymentController";
import { SocketioRepository } from "../../shared/socket/infraestructure/ports/socketioRepository";
import { SendDataService } from "../../shared/socket/application/sendDataService";

const amqplib = new AmqpRepository("amqp://18.209.192.241/");
const socketio = new SocketioRepository("http://52.201.131.189:5000/");

const sendMessageService = new SendMessageService(amqplib);
const sendDataService = new SendDataService(socketio);

const createPaymentService = new CreatePaymentService(sendMessageService, sendDataService);

export const createPaymentController = new CreatePaymentController(createPaymentService);


