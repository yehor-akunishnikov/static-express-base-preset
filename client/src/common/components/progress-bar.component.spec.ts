import { ProgressBarComponent } from './progress-bar.component';

describe('ProgressBarComponent', () => {
  let progressBarComponent: ProgressBarComponent;
  let progressBarDomContainer: HTMLElement;

  beforeEach(() => {
    progressBarDomContainer = document.createElement('div');
    progressBarDomContainer.innerHTML = `
      <div
        id="progress-container"
        class="progress"
        role="progressbar"
        aria-label="Basic example"
        aria-valuenow="0"
        aria-valuemin="0"
        aria-valuemax="100"
      >
        <div class="progress-bar" style="width: 0%"></div>
      </div>
    `;
    document.body.append(progressBarDomContainer);
  });

  beforeEach(() => {
    progressBarComponent = new ProgressBarComponent();
  });

  describe('Component basic functionality', () => {
    it('should init component', () => {
      expect(progressBarComponent.init('#progress-container')).toBeTrue();

      expect(progressBarComponent.init('#not-found-id')).toBeFalse();
    });

    it('set color status', () => {
      progressBarComponent.init('#progress-container');

      progressBarComponent.setColorStatus('danger');

      expect(progressBarComponent.progressLine.className.includes('bg-danger')).toBeTrue();

      progressBarComponent.setColorStatus('success');

      expect(progressBarComponent.progressLine.className.includes('bg-success')).toBeTrue();

      progressBarComponent.setColorStatus('primary');

      expect(progressBarComponent.progressLine.className.includes('bg-primary')).toBeTrue();
    });
  });

  describe('Animation', () => {
    beforeEach(() => {
      jasmine.clock().install();
    });

    afterEach(() => {
      jasmine.clock().uninstall();
    });

    it('should perform progress animation', () => {
      progressBarComponent.init('#progress-container');
      progressBarComponent.startAnimation();

      jasmine.clock().tick(500);

      expect(progressBarComponent.progressLine.outerHTML.includes('width: 4%')).toBeTrue();

      jasmine.clock().tick(2000);

      expect(progressBarComponent.progressLine.outerHTML.includes('width: 20%')).toBeTrue();

      jasmine.clock().tick(5000);

      expect(progressBarComponent.progressLine.outerHTML.includes('width: 60%')).toBeTrue();

      progressBarComponent.stopAnimation();

      expect(progressBarComponent.progressLine.outerHTML.includes('width: 100%')).toBeTrue();

      jasmine.clock().tick(2000);

      expect(progressBarComponent.progressLine.outerHTML.includes('width: 0%')).toBeTrue();
      expect(progressBarComponent.progressLine.className.includes('bg-primary')).toBeTrue();
    });
  });
});
