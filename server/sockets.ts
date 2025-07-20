import { Server } from 'socket.io';

let io: Server;

export function initSocket(server: any) {
    io = new Server(server, {
        cors: { origin: '*' }
    });

    console.log('WebSocket initialized');

    return io;
}

export function broadcastUpdate(data: any) {
    if (io) io.emit('stockUpdate', data);
}
