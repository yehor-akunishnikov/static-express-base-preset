import { ProgressBarComponent } from '../../../common/components/progress-bar.component';
import { CreateUserFormBuilder } from './create-user.form-builder';

import { User } from '../../../models/user';

describe('CreateUserFormBuilderService', () => {
  let createUserFormBuilder: CreateUserFormBuilder;
  let formBuilderUtilsService: any;
  let usersList: HTMLUListElement;
  let domAccessorsService: any;
  let httpClientService: any;
  let event: any;

  beforeEach(() => {
    createUserFormBuilder = new CreateUserFormBuilder();
    event = jasmine.createSpyObj('event', ['preventDefault', 'stopPropagation']);
    domAccessorsService = jasmine.createSpyObj(
      'domAccessorsService',
      ['getUserElement'],
      { createUserForm: jasmine.createSpyObj('createUserForm', ['addEventListener']) }
    );
    formBuilderUtilsService = jasmine.createSpyObj('formBuilderUtilsService', ['getEntityFromForm']);
    httpClientService = jasmine.createSpyObj('httpClientServiceService', ['post']);

    usersList = document.createElement('ul');
  });

  describe('From basic functionality', () => {
    it('should init form', () => {
      createUserFormBuilder.initProgress = jasmine.createSpy('initProgress');
      createUserFormBuilder.initSubmitButton = jasmine.createSpy('initSubmitButton');

      createUserFormBuilder.init(
        domAccessorsService,
        formBuilderUtilsService,
        httpClientService
      );

      expect(domAccessorsService.createUserForm.addEventListener).toHaveBeenCalled();
      expect(createUserFormBuilder.initProgress).toHaveBeenCalled();
      expect(createUserFormBuilder.initSubmitButton).toHaveBeenCalled();
    });

    it('should validate entity', () => {
      expect(
        createUserFormBuilder.validateEntity({ id: 'id', name: 'Name' } as User)
      ).toBeTrue();

      expect(
        createUserFormBuilder.validateEntity({} as User)
      ).toBeFalse();
    });

    it('should init progress bar', () => {
      createUserFormBuilder.initProgress({
        init: () => true
      } as unknown as ProgressBarComponent);

      expect(createUserFormBuilder.progress).toBeTruthy();

      createUserFormBuilder.initProgress({
        init: () => false
      } as unknown as ProgressBarComponent);

      expect(createUserFormBuilder.progress).toBeNull();
    });

    it('should init submit button', () => {
      const submitButton = document.createElement('button');

      createUserFormBuilder.form = document.createElement('form');
      submitButton.setAttribute('type', 'submit');
      createUserFormBuilder.form.append(submitButton);
      createUserFormBuilder.initSubmitButton();

      expect(createUserFormBuilder.submitButton).toBeTruthy();

      submitButton.remove();
      createUserFormBuilder.initSubmitButton();

      expect(createUserFormBuilder.submitButton).toBeNull();
    });
  });

  describe('Request progress view effects', () => {
    beforeEach(() => {
      createUserFormBuilder.progress = jasmine.createSpyObj(
        'progressBarComponent',
        ['setColorStatus', 'stopAnimation', 'startAnimation']
      );
    });

    it('should perform side effect on request success', () => {
      const user: User = {
        id: 'id',
        name: 'Name',
        favoriteColor: 'red',
        age: 11,
        cash: 110
      };

      createUserFormBuilder.writeDataToDom = jasmine.createSpy('writeDataToDom');
      createUserFormBuilder.toggleButtonDisable = jasmine.createSpy('toggleButtonDisable');

      createUserFormBuilder.onRequestSuccess(user, usersList);

      expect(createUserFormBuilder.progress.stopAnimation).toHaveBeenCalledWith('success');
      expect(createUserFormBuilder.writeDataToDom).toHaveBeenCalledWith(user, usersList);
      expect(createUserFormBuilder.toggleButtonDisable).toHaveBeenCalled();
    });

    it('should perform side effect on request error', () => {
      createUserFormBuilder.toggleButtonDisable = jasmine.createSpy('toggleButtonDisable');
      createUserFormBuilder.progress = jasmine.createSpyObj(
        'progressBarComponent',
        ['setColorStatus', 'stopAnimation', 'startAnimation']
      );

      createUserFormBuilder.onRequestError();

      expect(createUserFormBuilder.progress.stopAnimation).toHaveBeenCalledWith('danger');
      expect(createUserFormBuilder.toggleButtonDisable).toHaveBeenCalled();
    });

    it('should toggle button disable', () => {
      createUserFormBuilder.submitButton = document.createElement('button');

      createUserFormBuilder.toggleButtonDisable();

      expect(createUserFormBuilder.submitButton.disabled).toBeTrue();

      createUserFormBuilder.toggleButtonDisable();

      expect(createUserFormBuilder.submitButton.disabled).toBeFalse();
    });

    it('should add user data to DOM element', () => {
      const user: User = {
        id: 'id',
        name: 'Name',
        favoriteColor: 'red',
        age: 11,
        cash: 110
      };

      createUserFormBuilder.writeDataToDom(user, usersList);

      expect(usersList.innerHTML.includes('class="user m-2"')).toBeTrue();
      expect(usersList.innerHTML.includes(user.name)).toBeTrue();
      expect(usersList.innerHTML.includes(user.favoriteColor)).toBeTrue();
      expect(usersList.innerHTML.includes(String(user.age))).toBeTrue();
      expect(usersList.innerHTML.includes(String(user.cash))).toBeTrue();
    });
  });

  describe('REST API communication', () => {
    it('should send create request if form is valid', () => {
      const user: User = {
        id: 'id',
        name: 'Name',
        favoriteColor: 'red',
        age: 11,
        cash: 110
      };

      createUserFormBuilder.writeDataToDom = jasmine.createSpy('writeDataToDom');
      formBuilderUtilsService.getEntityFromForm.and.returnValue(user);
      httpClientService.post.and.resolveTo(Promise.resolve(user));

      createUserFormBuilder.onSubmit(
        event,
        domAccessorsService,
        formBuilderUtilsService,
        httpClientService
      );

      expect(httpClientService.post).toHaveBeenCalledWith('/users/api', user);
    });

    it('should not send create request if form is invalid', () => {
      const user = {} as User;

      formBuilderUtilsService.getEntityFromForm.and.returnValue(user);

      createUserFormBuilder.onSubmit(
        event,
        domAccessorsService,
        formBuilderUtilsService,
        httpClientService
      );

      expect(httpClientService.post).not.toHaveBeenCalled();
    });
  });
});
