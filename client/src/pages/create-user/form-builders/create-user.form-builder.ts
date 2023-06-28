import { FormBuilderUtilsService } from '../../../common/services/form-builder-utills.service';
import { ProgressBarComponent } from '../../../common/components/progress-bar.component';
import { DomAccessorsService } from '../../../common/services/dom-accessors.service';
import { HttpClientService } from '../../../common/services/http-client.service';

import { FormBuilder } from '../../../models/general';
import { User } from '../../../models/user';

export class CreateUserFormBuilder implements FormBuilder<User> {
  public progress: ProgressBarComponent = null;
  public submitButton: HTMLButtonElement = null;
  public form: HTMLFormElement = null;

  public toggleButtonDisable (): void {
    if (this.submitButton) {
      this.submitButton.disabled = !this.submitButton.disabled;
    }
  }

  public writeDataToDom (user: User, usersList: HTMLUListElement): void {
    const listItem = document.createElement('li');

    listItem.classList.add('user');
    listItem.classList.add('m-2');
    listItem.innerHTML = `
      <a class="link-underline-light" href="users/edit/${user.id}">
        <span class="card">
          <span class="card-header text-primary">${user.name}</span>
          <span class="card-body">
            <span>${user.favoriteColor}</span>
            <span>${user.age}</span>
            <span>${user.cash}</span>
          </span>
        </span>
      </a>
   `;

    usersList.append(listItem);
  };

  public validateEntity (user: User): boolean {
    return !!user.name;
  };

  public onRequestSuccess (user: User, usersList: HTMLUListElement): void {
    this.progress?.stopAnimation('success');
    this.writeDataToDom(user, usersList);
    this.toggleButtonDisable();
    this.form.reset();
  }

  public onRequestError (): void {
    this.progress?.stopAnimation('danger');
    this.toggleButtonDisable();
  }

  public onSubmit (
    event: SubmitEvent,
    domAccessorsService: DomAccessorsService,
    formBuilderUtilsService: FormBuilderUtilsService,
    httpClientService: HttpClientService
  ): void {
    event.preventDefault();
    event.stopPropagation();

    const user = formBuilderUtilsService.getEntityFromForm<User>(this.form);
    const isValid = this.validateEntity(user);

    if (isValid) {
      this.toggleButtonDisable();
      this.progress?.startAnimation();

      httpClientService
        .post<User>('/users/api', user)
        .then(({ response }) => {
          if (response) {
            this.onRequestSuccess(response, domAccessorsService.usersList);
          } else {
            this.onRequestError();
          }
        });
    }
  }

  public initProgress (progress: ProgressBarComponent): void {
    const isProgressInitialized = progress.init('#create-user-progress');

    if (isProgressInitialized) {
      this.progress = progress;
    } else {
      this.progress = null;
    }
  }

  public initSubmitButton (): void {
    this.submitButton = this.form.querySelector('button[type="submit"]') || null;
  }

  public init (
    domAccessorsService: DomAccessorsService,
    formBuilderUtilsService: FormBuilderUtilsService,
    httpClientService: HttpClientService
  ): void {
    this.form = domAccessorsService.createUserForm;

    this.form.addEventListener('submit', (event) => this.onSubmit(
      event,
      domAccessorsService,
      formBuilderUtilsService,
      httpClientService
    ));

    this.initProgress(new ProgressBarComponent());
    this.initSubmitButton();
  }
}
