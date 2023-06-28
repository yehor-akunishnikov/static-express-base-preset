import { DomAccessorsService } from './dom-accessors.service';

describe('DomAccessorsService', () => {
  let domAccessorsService: DomAccessorsService;

  beforeEach(() => {
    domAccessorsService = new DomAccessorsService();
  });

  it('should be created', () => {
    expect(domAccessorsService).toBeTruthy();
  });
});
