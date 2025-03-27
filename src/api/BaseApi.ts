import HTTPTransport from "../services/HttpTransport";

export class BaseAPI {
  protected baseUrl: string;
  protected http: HTTPTransport;
  constructor(baseURL: string) {
    this.baseUrl = baseURL;
    this.http = new HTTPTransport(baseURL);
  }
}
