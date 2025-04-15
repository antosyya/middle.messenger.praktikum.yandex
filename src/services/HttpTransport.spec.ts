import { createSandbox, SinonStub } from "sinon";
import { expect } from "chai";
import HTTPTransport from "./HttpTransport.ts";

describe("HTTPTransport", () => {
  const sandbox = createSandbox();
  let http: HTTPTransport;
  let request: SinonStub;
  const url = "/";
  const options = { data: "data" };
  beforeEach(() => {
    http = new HTTPTransport("");
    request = sandbox.stub(http, "request");
  });

  afterEach(() => {
    sandbox.restore();
  });

  it("проверка метода GET", async () => {
    await http.get(url, options);
    expect(request.getCall(0).args).to.deep.equal([
      url,
      {
        ...options,
        method: "GET",
      },
    ]);
  });
  it("проверка метода POST", async () => {
    await http.post(url, options);
    expect(request.getCall(0).args).to.deep.equal([
      url,
      {
        ...options,
        method: "POST",
      },
    ]);
  });
  it("проверка метода PUT", async () => {
    await http.put(url, options);
    expect(request.getCall(0).args).to.deep.equal([
      url,
      {
        ...options,
        method: "PUT",
      },
    ]);
  });
  it("проверка метода DELETE", async () => {
    await http.delete(url, options);
    expect(request.getCall(0).args).to.deep.equal([
      url,
      {
        ...options,
        method: "DELETE",
      },
    ]);
  });
});
