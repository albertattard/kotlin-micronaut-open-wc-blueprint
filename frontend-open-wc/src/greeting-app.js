import { css, html, LitElement } from 'lit-element';

export class GreetingApp extends LitElement {
  static get properties() {
    return {
      caption: { type: String },
      name: { type: String },
      basePath: { type: String },
    };
  }

  static get styles() {
    return css`
      :host {
        min-height: 100vh;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: flex-start;
        font-size: calc(10px + 2vmin);
        color: #1a2b42;
        max-width: 960px;
        margin: 0 auto;
        text-align: center;
      }

      main {
        flex-grow: 1;
        padding: 12px;
      }

      .header {
        font-size: 32pt;
        margin: 48px;
      }

      main span {
        margin: 12px;
        display: block;
      }

      .field > label {
        padding: 20px;
      }

      .field > input {
        line-height: 2em;
        padding: 0.3em;
        min-width: 400px;
        font-size: 1em;
      }

      .field > button {
        line-height: 2em;
        font-size: 1.2rem;
        color: rgb(255, 255, 255);
        background-color: rgb(33, 127, 249);
        padding: 0.5rem 1.6rem;
        border-radius: 4px;
        border-bottom: 1px solid rgb(7, 111, 247);
        transition: background-color 0.1s ease 0s;
      }

      .app-footer {
        font-size: calc(12px + 0.5vmin);
        align-items: center;
      }
    `;
  }

  constructor() {
    super();
    this.caption = 'Kotlin/Micronaut & Open WC Blueprint';
    this.name = '';
    this.basePath = '/greet';
  }

  greetUser(name) {
    return fetch(`${this.basePath}/${name}`, {
      headers: {
        Accept: 'application/json',
      },
    })
      .then(response => response.json())
      .then(json => {
        if (json.message) {
          return { error: false, caption: json.message };
        }
        return { error: true, caption: `Failed to parse greet response for ${name} ¯\\_(ツ)_/¯` };
      })
      .catch(() => ({ error: true, caption: `Failed to greet ${name} ¯\\_(ツ)_/¯` }));
  }

  greet() {
    const input = this.shadowRoot.querySelector('input[id=name]');
    const name = input.value;

    if (name.trim().length === 0) {
      input.focus();

      return new Promise(resolve => {
        resolve(false);
      });
    }

    return this.greetUser(name).then(reply => {
      this.caption = reply.caption;
      return !reply.error;
    });
  }

  render() {
    return html`
      <main>
        <div class="header">${this.caption}</div>

        <span class="field">
          <label>Name:</label>
          <input id="name" .value=${this.name} />
          <button @click="${e => this.greet(e)}">Greet</button>
        </span>
      </main>

      <p class="app-footer">
        Made with love and passion by Albert Attard
      </p>
    `;
  }
}

customElements.define('greeting-app', GreetingApp);
