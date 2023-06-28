import { FormBuilderUtilsService } from '../../../common/services/form-builder-utills.service';
import { ProgressBarComponent } from '../../../common/components/progress-bar.component';
import { DomAccessorsService } from '../../../common/services/dom-accessors.service';
import { HttpClientService } from '../../../common/services/http-client.service';

import { FormBuilder } from '../../../models/general';
import { User } from '../../../models/user';
export class UpdateUserFormBuilder implements FormBuilder<User> {
  public progress: ProgressBarComponent = null;
  public submitButton: HTMLButtonElement = null;
  public form: HTMLFormElement = null;

  public toggleButtonDisable (): void {
    if (this.submitButton) {
      this.submitButton.disabled = !this.submitButton.disabled;
    }
  }

  public writeDataToDom (user: User, userElement: HTMLLIElement): void {
    userElement.innerHTML = `
      <span class="card mb-2 p-2 text-center">${user.name}</span>
      <span class="card mb-2 p-2 text-center">${user.favoriteColor}</span>
      <span class="card mb-2 p-2 text-center">${user.age}</span>
      <span class="card p-2 text-center">${user.cash}</span>
   `;
  };

  public validateEntity (user: User): boolean {
    return !!user.name && !!user.id;
  };

  public onRequestSuccess (user: User, userElement: HTMLLIElement): void {
    this.progress?.stopAnimation('success');
    this.writeDataToDom(user, userElement);
    this.toggleButtonDisable();
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
    const userElement = domAccessorsService.getUserElement();
    user.id = domAccessorsService.getIdFromAttribute(userElement);

    const isValid = this.validateEntity(user);

    if (isValid) {
      this.toggleButtonDisable();
      this.progress?.startAnimation();

      httpClientService
        .put<User>(`/users/api/${user.id}`, user)
        .then(({ response }) => {
          if (response) {
            this.onRequestSuccess(response, userElement);
          } else {
            this.onRequestError();
          }
        });
    }
  }

  public initProgress (progress: ProgressBarComponent): void {
    const isProgressInitialized = progress.init('#update-user-progress');

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
    this.form = domAccessorsService.updateUserForm;

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
