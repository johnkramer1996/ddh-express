import { injectable } from 'inversify'
import { Server as ServerIo, Socket } from 'socket.io'
import http from 'http'

export interface ISocketServer {
  create(server: http.Server): SocketServer
  connect(): void
}

@injectable()
export class SocketServer implements ISocketServer {
  private io!: ServerIo
  private onlineUsers = new Map<string, Socket>()

  constructor() {}

  public create(server: http.Server): SocketServer {
    this.io = new ServerIo(server, { cors: { origin: 'http://localhost:8088', credentials: true } })
    return this
  }

  public connect() {
    this.io.on('connection', (socket) => {
      socket.on('online', (params) => {
        this.onlineUsers.set(params.fromMember, socket)
        const toMemberSocket = this.onlineUsers.get(params.toMember)
        if (!toMemberSocket) return
        socket.to(toMemberSocket.id).emit('online', params)
        toMemberSocket.to(socket.id).emit('online', { fromMember: params.toMember, toMember: params.fromMember })
      })
      ;['offline', 'startTyping', 'endTyping', 'addMessage', 'updateMessage', 'readAll'].map((event) => {
        socket.on(event, (params) => {
          this.onlineUsers.delete(params.fromMember)
          const toMemberSocket = this.onlineUsers.get(params.toMember)
          if (!toMemberSocket) return
          socket.to(toMemberSocket.id).emit(event, params)
        })
      })

      // socket.on('offline', (params) => {
      //   this.onlineUsers.delete(params.fromMember)
      //   const toMemberSocket = this.onlineUsers.get(params.toMember)
      //   if (!toMemberSocket) return
      //   socket.to(toMemberSocket.id).emit('offline', params)
      // })
      // socket.on('startTyping', (params) => {
      //   const toMemberSocket = this.onlineUsers.get(params.toMember)
      //   if (!toMemberSocket) return
      //   socket.to(toMemberSocket.id).emit('startTyping', params)
      // })
      // socket.on('endTyping', (params) => {
      //   const toMemberSocket = this.onlineUsers.get(params.toMember)
      //   if (!toMemberSocket) return
      //   socket.to(toMemberSocket.id).emit('endTyping', params)
      // })

      // socket.on('addMessage', (params) => {
      //   const toMemberSocket = this.onlineUsers.get(params.toMember)
      //   if (!toMemberSocket) return
      //   socket.to(toMemberSocket.id).emit('addMessage', params)
      // })
      // socket.on('updateMessage', (params) => {
      //   const toMemberSocket = this.onlineUsers.get(params.toMember)
      //   if (!toMemberSocket) return
      //   socket.to(toMemberSocket.id).emit('updateMessage', params)
      // })
      // socket.on('readAll', (params) => {
      //   const toMemberSocket = this.onlineUsers.get(params.toMember)
      //   if (!toMemberSocket) return
      //   socket.to(toMemberSocket.id).emit('readAll', params)
      // })
    })
  }
}
