export type ProgressColorStatus = 'primary' | 'success' | 'danger';

export class ProgressBarComponent {
  private interval: ReturnType<typeof setInterval> = null;

  public domContainer: HTMLElement = null;
  public progressLine: HTMLElement = null;

  public setColorStatus (colorStatus: ProgressColorStatus): void {
    if (this.progressLine) {
      this.progressLine.classList.remove('bg-primary');
      this.progressLine.classList.remove('bg-success');
      this.progressLine.classList.remove('bg-danger');
      this.progressLine.classList.add(`bg-${colorStatus}`);
    }
  }

  public startAnimation (): void {
    if (this.progressLine) {
      this.interval = setInterval(() => {
        const styleValue = this.progressLine.getAttribute('style');
        const currentLength: number = parseInt(styleValue.split(': ')[1]);

        if (currentLength < 100 - 20) {
          this.progressLine.setAttribute('style', `width: ${currentLength + 4}%`);
        }
      }, 500);
    }
  }

  public stopAnimation (colorStatus: ProgressColorStatus = 'success'): void {
    clearInterval(this.interval);

    if (this.progressLine) {
      this.progressLine.setAttribute('style', 'width: 100%');
      this.setColorStatus(colorStatus);

      setTimeout(() => {
        this.progressLine.setAttribute('style', 'width: 0%');
        this.setColorStatus('primary');
      }, 2000);
    }
  }

  public init (domSelector: string): boolean {
    const domContainer: HTMLElement = document.querySelector(domSelector);

    if (domContainer) {
      this.domContainer = domContainer;
      this.progressLine = this.domContainer.querySelector('.progress-bar');

      return true;
    } else {
      return false;
    }
  }
}
