export class FormBuilderUtilsService {
  getEntityFromForm <Entity> (form: HTMLFormElement): Entity {
    return Object.fromEntries(new FormData(form)) as unknown as Entity;
  };
}

export const formBuilderUtilsService = new FormBuilderUtilsService();
