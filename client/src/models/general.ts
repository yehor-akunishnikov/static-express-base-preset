import { FormBuilderUtilsService } from '../common/services/form-builder-utills.service';
import { DomAccessorsService } from '../common/services/dom-accessors.service';
import { HttpClientService } from '../common/services/http-client.service';

export interface FormBuilder<Entity> {
  writeDataToDom: (entity: Entity, ...args: any[]) => void;
  validateEntity: (entity: Entity) => boolean;
  onSubmit: (
    event: SubmitEvent,
    domAccessorsService: DomAccessorsService,
    formBuilderUtils: FormBuilderUtilsService,
    httpClientService: HttpClientService
  ) => void;
  init: (
    domAccessorsService: DomAccessorsService,
    formBuilderUtils: FormBuilderUtilsService,
    httpClientService: HttpClientService
  ) => void;
}

export interface Page {
  formBuilders?: Record<string, FormBuilder<any>>;
  init: (...args: any[]) => void;
}
