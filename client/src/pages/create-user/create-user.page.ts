import { FormBuilderUtilsService } from '../../common/services/form-builder-utills.service';
import { CreateUserFormBuilder } from './form-builders/create-user.form-builder';
import { DomAccessorsService } from '../../common/services/dom-accessors.service';
import { HttpClientService } from '../../common/services/http-client.service';

import { FormBuilder, Page } from '../../models/general';

export class CreateUserPage implements Page {
  public readonly formBuilders: Record<string, FormBuilder<any>> = {};

  public init (
    createUserForm: HTMLFormElement,
    domAccessorsService: DomAccessorsService,
    formBuilderUtilsService: FormBuilderUtilsService,
    httpClientService: HttpClientService
  ): void {
    if (createUserForm) {
      this.formBuilders.createUserFormBuilder = new CreateUserFormBuilder();
      this.formBuilders.createUserFormBuilder.init(domAccessorsService, formBuilderUtilsService, httpClientService);
    }
  }
}
