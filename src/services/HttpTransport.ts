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
) => Promise<unknown>;
type HTTPRequest = (url: string, options?: Options) => Promise<unknown>;
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

    return new Promise(function (resolve, reject) {
      if (!method) {
        reject("No method");
        return;
      }

      const xhr = new XMLHttpRequest();
      const isGet = method === METHODS.GET;

      xhr.open(method, isGet && !!data ? `${url}${queryStringify(data)}` : url);

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
      } else {
        xhr.send(data as Document | XMLHttpRequestBodyInit | null | undefined);
      }
    });
  };
}
