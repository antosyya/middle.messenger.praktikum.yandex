import EventBus from "../../services/EventBus";

export enum WSTransportEvents {
  Connected = "connected",
  Error = "error",
  Message = "message",
  Close = "close",
}

export default class WSTransport extends EventBus {
  private socket: WebSocket;
  private pingInterval: number | ReturnType<typeof setInterval> = 0;

  constructor(url: string) {
    super();
    this.socket = new WebSocket(url);
  }

  connect(): Promise<void> {
    return new Promise((res) => {
      this.on(WSTransportEvents.Connected, () => res());
      this.subscribe();
      this.ping();
    });
  }

  ping(): void {
    this.pingInterval = setInterval(() => {
      this.send({ type: "ping" });
    }, 30000);
    this.on(WSTransportEvents.Close, () => clearInterval(this.pingInterval));
  }

  send(data: unknown): void {
    console.log(data);
    this.socket.send(JSON.stringify(data));
  }

  close(): void {
    this.emit(WSTransportEvents.Close);
  }

  private subscribe() {
    this.socket.addEventListener("open", () => {
      this.emit(WSTransportEvents.Connected);
    });
    this.socket.addEventListener("close", () => {
      this.emit(WSTransportEvents.Close);
    });

    this.socket.addEventListener("error", (e) => {
      this.emit(WSTransportEvents.Error, e);
    });

    this.socket.addEventListener("message", (message) => {
      try {
        const data = JSON.parse(message.data);
        if (data.type && data.type === "pong") {
          return;
        }
        this.emit(WSTransportEvents.Message, data);
      } catch (e) {
        console.error(e);
      }
    });
  }
}
