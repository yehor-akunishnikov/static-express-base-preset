import { ProgressBarComponent } from '../../../common/components/progress-bar.component';
import { UpdateUserFormBuilder } from './update-user.form-builder';

import { User } from '../../../models/user';

describe('UpdateUserFormBuilderService', () => {
  let updateUserFormBuilder: UpdateUserFormBuilder;
  let formBuilderUtilsService: any;
  let userElement: HTMLLIElement;
  let domAccessorsService: any;
  let httpClientService: any;
  let event: any;

  beforeEach(() => {
    updateUserFormBuilder = new UpdateUserFormBuilder();
    event = jasmine.createSpyObj('event', ['preventDefault', 'stopPropagation']);
    domAccessorsService = jasmine.createSpyObj(
      'domAccessorsService',
      ['getUserElement', 'getIdFromAttribute'],
      { updateUserForm: jasmine.createSpyObj('updateUserForm', ['addEventListener']) }
    );
    formBuilderUtilsService = jasmine.createSpyObj('formBuilderUtilsService', ['getEntityFromForm']);
    httpClientService = jasmine.createSpyObj('httpClientService', ['put']);

    userElement = document.createElement('li');
  });

  describe('From basic functionality', () => {
    it('should init form', () => {
      updateUserFormBuilder.initProgress = jasmine.createSpy('initProgress');
      updateUserFormBuilder.initSubmitButton = jasmine.createSpy('initSubmitButton');

      updateUserFormBuilder.init(
        domAccessorsService,
        formBuilderUtilsService,
        httpClientService
      );

      expect(domAccessorsService.updateUserForm.addEventListener).toHaveBeenCalled();
      expect(updateUserFormBuilder.initProgress).toHaveBeenCalled();
      expect(updateUserFormBuilder.initSubmitButton).toHaveBeenCalled();
    });

    it('should validate entity', () => {
      expect(
        updateUserFormBuilder.validateEntity({ id: 'id', name: 'Name' } as User)
      ).toBeTrue();

      expect(
        updateUserFormBuilder.validateEntity({} as User)
      ).toBeFalse();
    });

    it('should init progress bar', () => {
      updateUserFormBuilder.initProgress({
        init: () => true
      } as unknown as ProgressBarComponent);

      expect(updateUserFormBuilder.progress).toBeTruthy();

      updateUserFormBuilder.initProgress({
        init: () => false
      } as unknown as ProgressBarComponent);

      expect(updateUserFormBuilder.progress).toBeNull();
    });

    it('should init submit button', () => {
      const submitButton = document.createElement('button');

      updateUserFormBuilder.form = document.createElement('form');
      submitButton.setAttribute('type', 'submit');
      updateUserFormBuilder.form.append(submitButton);
      updateUserFormBuilder.initSubmitButton();

      expect(updateUserFormBuilder.submitButton).toBeTruthy();

      submitButton.remove();
      updateUserFormBuilder.initSubmitButton();

      expect(updateUserFormBuilder.submitButton).toBeNull();
    });
  });

  describe('Request progress view effects', () => {
    beforeEach(() => {
      updateUserFormBuilder.progress = jasmine.createSpyObj(
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

      updateUserFormBuilder.writeDataToDom = jasmine.createSpy('writeDataToDom');
      updateUserFormBuilder.toggleButtonDisable = jasmine.createSpy('toggleButtonDisable');

      updateUserFormBuilder.onRequestSuccess(user, userElement);

      expect(updateUserFormBuilder.progress.stopAnimation).toHaveBeenCalledWith('success');
      expect(updateUserFormBuilder.writeDataToDom).toHaveBeenCalledWith(user, userElement);
      expect(updateUserFormBuilder.toggleButtonDisable).toHaveBeenCalled();
    });

    it('should perform side effect on request error', () => {
      updateUserFormBuilder.toggleButtonDisable = jasmine.createSpy('toggleButtonDisable');
      updateUserFormBuilder.progress = jasmine.createSpyObj(
        'progressBarComponent',
        ['setColorStatus', 'stopAnimation', 'startAnimation']
      );

      updateUserFormBuilder.onRequestError();

      expect(updateUserFormBuilder.progress.stopAnimation).toHaveBeenCalledWith('danger');
      expect(updateUserFormBuilder.toggleButtonDisable).toHaveBeenCalled();
    });

    it('should toggle button disable', () => {
      updateUserFormBuilder.submitButton = document.createElement('button');

      updateUserFormBuilder.toggleButtonDisable();

      expect(updateUserFormBuilder.submitButton.disabled).toBeTrue();

      updateUserFormBuilder.toggleButtonDisable();

      expect(updateUserFormBuilder.submitButton.disabled).toBeFalse();
    });

    it('should patch user data to DOM element', () => {
      const user: User = {
        id: 'id',
        name: 'Name',
        favoriteColor: 'red',
        age: 11,
        cash: 110
      };

      updateUserFormBuilder.writeDataToDom(user, userElement);

      expect(userElement.innerHTML.includes(user.name)).toBeTrue();
      expect(userElement.innerHTML.includes(user.favoriteColor)).toBeTrue();
      expect(userElement.innerHTML.includes(String(user.age))).toBeTrue();
      expect(userElement.innerHTML.includes(String(user.cash))).toBeTrue();
    });
  });

  describe('REST API communication', () => {
    it('should send update request if form is valid', () => {
      const user: User = {
        id: 'id',
        name: 'Name',
        favoriteColor: 'red',
        age: 11,
        cash: 110
      };
      const userElement = document.createElement('li');

      updateUserFormBuilder.writeDataToDom = jasmine.createSpy('writeDataToDom');
      formBuilderUtilsService.getEntityFromForm.and.returnValue(user);
      domAccessorsService.getUserElement.and.returnValue(userElement);
      domAccessorsService.getIdFromAttribute.and.returnValue('id');
      httpClientService.put.and.resolveTo(Promise.resolve(user));

      updateUserFormBuilder.onSubmit(
        event,
        domAccessorsService,
        formBuilderUtilsService,
        httpClientService
      );

      expect(httpClientService.put).toHaveBeenCalledWith('/users/api/id', user);
    });

    it('should not send update request if form is invalid', () => {
      const user = {} as User;

      formBuilderUtilsService.getEntityFromForm.and.returnValue(user);
      domAccessorsService.getUserElement.and.returnValue(userElement);
      domAccessorsService.getIdFromAttribute.and.returnValue('id');
      httpClientService.put.and.resolveTo(Promise.resolve(user));

      updateUserFormBuilder.onSubmit(
        event,
        domAccessorsService,
        formBuilderUtilsService,
        httpClientService
      );

      expect(httpClientService.put).not.toHaveBeenCalled();
    });
  });
});
