import WSTransport, { WSTransportEvents } from "../api/msg/WSTransport";
import { BASE_URL_WS } from "../constants";
import { Message } from "../types/Message";
import store from "./store";

export const isMessageItem = (data: unknown): data is Message => {
  return (
    typeof data === "object" &&
    data !== null &&
    "content" in data &&
    "type" in data &&
    typeof data.content === "string" &&
    typeof data.type === "string"
  );
};

class MessageController {
  wsTransport!: WSTransport;

  baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  async connect(urlWebSocket: string): Promise<void> {
    if (this.wsTransport) {
      this.wsTransport.close();
    }
    this.wsTransport = new WSTransport(this.baseUrl + urlWebSocket);
    await this.wsTransport.connect();
    this.subscribe(this.wsTransport);
    this.getMessage(0);
  }

  private subscribe(wsTransport: WSTransport): void {
    wsTransport.on(WSTransportEvents.Message, this.lsnMsg.bind(this));
    wsTransport.on(WSTransportEvents.Error, this.lsnError.bind(this));
  }

  getMessage(offset: number): void {
    this.wsTransport.send({
      content: offset,
      type: "get old",
    });
  }

  sendMessage(message: string, type: "message" | "file" = "message") {
    this.wsTransport.send({
      content: message,
      type: type,
    });
  }

  private lsnMsg(message: unknown): void {
    if (
      typeof message === "object" &&
      message !== null &&
      "content" in message &&
      "type" in message &&
      typeof message.content === "string" &&
      typeof message.type === "string" &&
      message.type !== "user connected"
    ) {
      const messages = store.getState().message || [];
      message = [...messages, message];
    } else if (typeof message === "object" && Array.isArray(message)) {
      message.reverse();
    } else {
      return;
    }
    store.set("message", message);
  }

  private lsnError(error: unknown): void {
    console.log(error);
  }
}

export default new MessageController(BASE_URL_WS);
