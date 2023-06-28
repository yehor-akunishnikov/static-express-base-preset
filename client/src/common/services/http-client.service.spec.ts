import { HttpClientService } from './http-client.service';

describe('HttpClientService', () => {
  let httpClientService: HttpClientService;

  beforeEach(() => {
    httpClientService = new HttpClientService();
  });

  it('should be created', () => {
    expect(httpClientService).toBeTruthy();
  });
});
