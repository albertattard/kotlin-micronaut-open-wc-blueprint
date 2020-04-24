import { expect, fixture, html } from '@open-wc/testing';
import sinon from 'sinon';
import '../src/greeting-app.js';

describe('Greeting App', () => {
  let element;
  beforeEach(async () => {
    element = await fixture(html`
      <greeting-app></greeting-app>
    `);
  });

  describe('General', () => {
    it('renders footer', () => {
      const footer = element.shadowRoot.querySelector('p[class=app-footer]');
      expect(footer).to.exist;
      expect(footer.textContent).to.contain('Made with love and passion by Albert Attard');
    });
  });

  describe('Simulating Interaction', () => {
    it('should call the greet function when the button is clicked', () => {
      element.greet = sinon.stub();
      element.greet.resolves(true);

      element.shadowRoot.querySelector('button').click();

      expect(element.greet.called).to.be.true;
    });

    it('should focus the input when the greet function is called without entering anything', async () => {
      const input = element.shadowRoot.querySelector('input');
      expect(input).to.exist;
      expect(element.shadowRoot.activeElement).to.be.null;

      const result = await element.greet();

      expect(result).to.be.false;
      expect(element.shadowRoot.activeElement).to.be.eq(input);
    });

    it('should show the greeting message returned by the greetUser function (simulating a successfull response from server)', async () => {
      const caption = 'Hello there';
      element.greetUser = sinon.stub();
      element.greetUser.resolves({ error: false, caption });

      const input = element.shadowRoot.querySelector('input');
      input.value = 'Test User';

      const result = await element.greet();

      expect(result).to.be.true;
      expect(element.greetUser.calledWith(input.value)).to.be.true;

      const header = element.shadowRoot.querySelector('div[class=header]');
      expect(header).to.exist;
      expect(header.textContent).to.contain(caption);
    });

    it('should show an error when the greetUser function returns an error (simulating an error while communicating to the server)', async () => {
      const simulatedError = 'Simulated Error';
      element.greetUser = sinon.stub();
      element.greetUser.resolves({ error: true, caption: simulatedError });

      const input = element.shadowRoot.querySelector('input');
      input.value = 'Test User';

      const result = await element.greet();

      expect(result).to.be.false;
      expect(element.greetUser.calledWith(input.value)).to.be.true;

      const header = element.shadowRoot.querySelector('div[class=header]');
      expect(header).to.exist;
      expect(header.textContent).to.contain(simulatedError);
    });
  });

  // /* I am not able to get this working :( */
  // describe('Mocking Server Interaction', () => {
  //   it('should return the message received from the server', async () => {
  //     const message = 'Hello from the server side';
  //     const name = 'Test User';
  //
  //     fetchMock.get(`/greet?name=${name}`, { message });
  //
  //     const result = await element.greetUser(name);
  //
  //     expect(result).to.be.eq({ error: false, caption: message });
  //   });
  // });
});
