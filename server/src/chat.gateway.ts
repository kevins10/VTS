// import { SubscribeMessage, WebSocketGateway, MessageBody, WebSocketServer } from "@nestjs/websockets";
// import { Server } from "http";


// @WebSocketGateway(80, {cors: "*"})
// export class ChatGateway {
//     @WebSocketServer()
//     server: Server

//     @SubscribeMessage('message')
//     handMessage(@MessageBody() data: any): void{
//         console.log("RECEIVED MESSAGE:", data)
//         this.server.emit('message', data.message)
//     }
// }