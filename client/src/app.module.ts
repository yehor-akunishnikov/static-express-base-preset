import { FormBuilderUtilsService, formBuilderUtilsService } from './common/services/form-builder-utills.service';
import { DomAccessorsService, domAccessorsService } from './common/services/dom-accessors.service';
import { HttpClientService, httpClientService } from './common/services/http-client.service';
import { UpdateUserPage } from './pages/update-user/update-user.page';
import { CreateUserPage } from './pages/create-user/create-user.page';

import { Page } from './models/general';

class AppModule {
  public readonly pages: Record<string, Page> = {};

  public init (
    domAccessorsService: DomAccessorsService,
    formBuilderUtilsService: FormBuilderUtilsService,
    httpClientService: HttpClientService
  ): void {
    this.pages.createUserPage = new CreateUserPage();
    this.pages.createUserPage.init(domAccessorsService.createUserForm, domAccessorsService, formBuilderUtilsService, httpClientService);

    this.pages.updateUserPage = new UpdateUserPage();
    this.pages.updateUserPage.init(domAccessorsService.updateUserForm, domAccessorsService, formBuilderUtilsService, httpClientService);
  }
}

const appModule = new AppModule();

appModule.init(domAccessorsService, formBuilderUtilsService, httpClientService);
