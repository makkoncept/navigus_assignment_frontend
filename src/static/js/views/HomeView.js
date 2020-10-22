import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
  constructor(params) {
    super(params);
    this.setTitle("Login");
  }

  async getHtml() {
    return `
        <div>
            <h1>Home</h1>
            <a href="/login" data-link>Login</a>
            <a href="/register" data-link>Register</a>
        </div>
        `;
  }
}
