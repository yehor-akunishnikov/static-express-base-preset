export class HttpClientService {
  public getRequestPayload <Entity> (
    method: string,
    body?: Entity,
    headers?: HeadersInit
  ): RequestInit {
    const payload: RequestInit = {
      headers: {
        'Content-Type': 'application/json; charset=UTF-8'
      }
    };

    if (body) {
      payload.body = JSON.stringify(body);
    }

    if (method) {
      payload.method = method;
    }

    if (headers) {
      payload.headers = { ...payload.headers, ...headers };
    }

    return payload;
  }

  public async sendRequest <Entity> (url: string, requestPayload: RequestInit): Promise<{ response?: Entity, error?: Error }> {
    try {
      const res = await fetch(url, requestPayload);

      if (res.status >= 200 && res.status < 300) {
        const response = await res.json();

        return { response };
      } else {
        const error = await res.text().then(err => JSON.parse(err));

        return { error };
      }
    } catch (error) {
      return { error };
    }
  }

  public async get <Entity> (url: string, headers?: HeadersInit): Promise<{ response?: Entity, error?: Error }> {
    const requestPayload: RequestInit = this.getRequestPayload('GET', null, headers);

    return this.sendRequest(url, requestPayload);
  }

  public async post <Entity> (url: string, body: Entity, headers?: HeadersInit): Promise<{ response?: Entity, error?: Error }> {
    const requestPayload: RequestInit = this.getRequestPayload('POST', body, headers);

    return this.sendRequest(url, requestPayload);
  }

  public async delete <Entity> (url: string, headers?: HeadersInit): Promise<{ response?: Entity, error?: Error }> {
    const requestPayload: RequestInit = this.getRequestPayload('DELETE', null, headers);

    return this.sendRequest(url, requestPayload);
  }

  public async put <Entity> (url: string, body: Entity, headers?: HeadersInit): Promise<{ response?: Entity, error?: Error }> {
    const requestPayload = this.getRequestPayload('PUT', body, headers);

    return this.sendRequest(url, requestPayload);
  }
}

export const httpClientService = new HttpClientService();
