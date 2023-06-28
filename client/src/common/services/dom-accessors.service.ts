export class DomAccessorsService {
  public updateUserForm: HTMLFormElement = document.querySelector('#update-user-form');
  public createUserForm: HTMLFormElement = document.querySelector('#create-user-form');

  public usersList: HTMLUListElement = document.querySelector('#users-list');

  public getUserElementById (id: string): HTMLLIElement {
    return Array
      .from(this.usersList.querySelectorAll('li'))
      .find(user => user.getAttribute('id').includes(id)) || null;
  }

  public getUserElement (): HTMLLIElement {
    return Array
      .from(this.usersList.querySelectorAll('li'))
      .find(li => (li.getAttribute('id') || '')?.split('-')[0].includes('user'));
  };

  public getIdFromAttribute (element: HTMLElement): string | null {
    const attributeValue = element.getAttribute('id');

    if (attributeValue) {
      return attributeValue.split('-')[1] || null;
    } else {
      return null;
    }
  };

  public getEntityNameFromAttribute (element: HTMLElement, attributeName: string): string | null {
    const attributeValue = element.getAttribute(attributeName);

    if (attributeValue) {
      return attributeValue.split('-')[0] || null;
    } else {
      return null;
    }
  };
}

export const domAccessorsService = new DomAccessorsService();
