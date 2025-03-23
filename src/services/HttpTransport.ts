enum METHODS {
  GET = "GET",
  POST = "POST",
  PUT = "PUT",
  DELETE = "DELETE",
}

// Самая простая версия. Реализовать штучку со всеми проверками им предстоит в конце спринта
// Необязательный метод
interface Options {
  method?: METHODS;
  data?: unknown;
  headers?: Record<string, string>;
  timeout?: number;
}
export type OptionsWithoutMethod = Omit<Options, "method">;
type HTTPMethod = (
  url: string,
  options?: OptionsWithoutMethod
) => Promise<XMLHttpRequest>;
type HTTPRequest = (url: string, options?: Options) => Promise<XMLHttpRequest>;

export function queryStringify(data: unknown) {
  if (typeof data !== "object") {
    throw new Error("Data must be object");
  }

  if (data instanceof Object) {
    const keys = Object.keys(data);
    return keys.reduce((result, key, index) => {
      return `${result}${key}=${(data as Record<string, unknown>)[key]}${
        index < keys.length - 1 ? "&" : ""
      }`;
    }, "?");
  }
}

export default class HTTPTransport {
  private baseURL: string;
  constructor(baseURL: string) {
    this.baseURL = baseURL;
  }
  get: HTTPMethod = (url, options = {}) => {
    return this.request(url, { ...options, method: METHODS.GET });
  };

  post: HTTPMethod = (url, options = {}) => {
    return this.request(url, { ...options, method: METHODS.POST });
  };

  put: HTTPMethod = (url, options = {}) => {
    return this.request(url, { ...options, method: METHODS.PUT });
  };

  delete: HTTPMethod = (url, options = {}) => {
    return this.request(url, { ...options, method: METHODS.DELETE });
  };

  request: HTTPRequest = (url: string, options = {}, timeout = 5000) => {
    const { headers = {}, method, data } = options;
    const requestURl: string = this.baseURL + url;
    return new Promise(function (resolve, reject) {
      if (!method) {
        reject("No method");
        return;
      }

      const xhr = new XMLHttpRequest();
      const isGet = method === METHODS.GET;

      xhr.open(
        method,
        isGet && !!data ? `${requestURl}${queryStringify(data)}` : requestURl
      );
      xhr.withCredentials = true;
      Object.keys(headers).forEach((key) => {
        xhr.setRequestHeader(key, headers[key]);
      });

      xhr.onload = function () {
        resolve(xhr);
      };

      xhr.onabort = reject;
      xhr.onerror = reject;

      xhr.timeout = timeout;
      xhr.ontimeout = reject;

      if (isGet || !data) {
        xhr.send();
      } else if (
        typeof data === "string" ||
        data instanceof Document ||
        data instanceof Blob ||
        data instanceof ArrayBuffer ||
        data instanceof FormData
      ) {
        xhr.send(data);
      } else {
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.send(
          JSON.stringify(data) as
            | Document
            | XMLHttpRequestBodyInit
            | null
            | undefined
        );
      }
    });
  };
}
