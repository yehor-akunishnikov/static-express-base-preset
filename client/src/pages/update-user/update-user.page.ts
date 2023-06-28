import { FormBuilderUtilsService } from '../../common/services/form-builder-utills.service';
import { UpdateUserFormBuilder } from './form-builders/update-user.form-builder';
import { DomAccessorsService } from '../../common/services/dom-accessors.service';
import { HttpClientService } from '../../common/services/http-client.service';

import { FormBuilder, Page } from '../../models/general';

export class UpdateUserPage implements Page {
  public readonly formBuilders: Record<string, FormBuilder<any>> = {};

  public init (
    updateUserForm: HTMLFormElement,
    domAccessorsService: DomAccessorsService,
    formBuilderUtilsService: FormBuilderUtilsService,
    httpClientService: HttpClientService
  ): void {
    if (updateUserForm) {
      this.formBuilders.updateUserFormBuilder = new UpdateUserFormBuilder();
      this.formBuilders.updateUserFormBuilder.init(domAccessorsService, formBuilderUtilsService, httpClientService);
    }
  }
}
