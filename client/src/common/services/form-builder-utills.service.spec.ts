import { FormBuilderUtilsService } from './form-builder-utills.service';

describe('FormBuilderUtilsService', () => {
  let formBuilderUtilsService: FormBuilderUtilsService;

  beforeEach(() => {
    formBuilderUtilsService = new FormBuilderUtilsService();
  });

  it('should be created', () => {
    expect(formBuilderUtilsService).toBeTruthy();
  });
});
