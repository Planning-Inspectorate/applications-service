/**
 * @jest-environment jsdom
 */

const $ = require('jquery');
global.$ = $;
global.jQuery = $;

const stepByStep = require('../../../src/scripts/step-by-step');

const domElement = `
  <div id="step-by-step-navigation" class="app-step-nav app-step-nav--large app-step-nav--active" data-show-text="Show" data-hide-text="Hide" data-show-all-text="Show all" data-hide-all-text="Hide all">
    <ol class="app-step-nav__steps">
      <li class="app-step-nav__step js-step" id="pre-application">
        <div class="app-step-nav__header js-toggle-panel" data-position="1">
          <h2 class="app-step-nav__title">
            <span class="app-step-nav__circle app-step-nav__circle--number">
              <span class="app-step-nav__circle-inner">
                <span class="app-step-nav__circle-background">
                  <span class="govuk-visually-hidden">Step</span> 1
                </span>
              </span>
            </span>

            <span class="js-step-title">
              Title 1
            </span>
          </h2>
        </div>

        <div class="app-step-nav__panel js-panel js-hidden" id="step-panel-pre-application-1">
          <p>Lorem ipsum</p>
        </div>
      </li>

      <li class="app-step-nav__step js-step" id="pre-application">
        <div class="app-step-nav__header js-toggle-panel" data-position="2">
          <h2 class="app-step-nav__title">
            <span class="app-step-nav__circle app-step-nav__circle--number">
              <span class="app-step-nav__circle-inner">
                <span class="app-step-nav__circle-background">
                  <span class="govuk-visually-hidden">Step</span> 2
                </span>
              </span>
            </span>

            <span class="js-step-title">
              Title 2
            </span>
          </h2>
        </div>

        <div class="app-step-nav__panel js-panel js-hidden" id="step-panel-pre-application-1">
          <p>Lorem ipsum</p>
        </div>
      </li>
    </ol>
  </div>
`;

document.body.innerHTML = domElement;

const initiateStepByStep = new stepByStep();
initiateStepByStep.start('#step-by-step-navigation');

const stepControlsButton = document.querySelector('.app-step-nav__button');

const stepByStepSections = [...document.querySelectorAll('.app-step-nav__step')];

const sectionOne = stepByStepSections[0];
const buttonOne = sectionOne.querySelector('.js-toggle-panel');
const panelOne = sectionOne.querySelector('.app-step-nav__panel');

describe('scripts/step-by-step', () => {
	test('Expect new stepByStep() to be an object', () => {
		const stepByStepToBeObject = new stepByStep();

		expect(typeof stepByStepToBeObject).toBe('object');
	});

	test('Expect initiatePass.scripts to be a function', () => {
		const initiateToBeFunction = new stepByStep();

		expect(typeof initiateToBeFunction.start).toBe('function');
	});

	test('classes have been added', () => {
		expect(document.body.innerHTML).not.toEqual(domElement);
	});

	test('panel is open', () => {
		buttonOne.click();

		expect(sectionOne.classList.contains('step-is-shown')).toEqual(true);
		expect(panelOne.classList.contains('js-hidden')).toEqual(false);
	});

	test('panel is closed', () => {
		buttonOne.click();

		expect(sectionOne.classList.contains('step-is-shown')).toEqual(false);
		expect(panelOne.classList.contains('js-hidden')).toEqual(true);
	});

	test('has step controls', () => {
		expect(stepControlsButton).toBeDefined();
	});

	test('all panels are open', () => {
		stepControlsButton.click();

		const allSections = stepByStepSections.filter((stepByStepSection) => {
			return stepByStepSection.classList.contains('step-is-shown');
		});

		expect(allSections.length).toEqual(stepByStepSections.length);
		expect(stepControlsButton.innerHTML).toEqual('Hide all');
	});

	test('all panels are closed', () => {
		stepControlsButton.click();

		const allSections = stepByStepSections.filter((stepByStepSection) => {
			return stepByStepSection.classList.contains('step-is-shown');
		});

		expect(allSections.length).toEqual(0);
		expect(stepControlsButton.innerHTML).toEqual('Show all');
	});
});
