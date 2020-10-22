import { appObject } from "../base.js";
import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
  constructor(params) {
    super(params);
    this.setTitle("Home");
  }

  async getHtml() {
    console.log(appObject);
    if (appObject.getItem("isLoggedIn") === "true") {
      return `
        <div>
            <h1>Home</h1>
            <a href="/dashboard" data-link>Go back to dashboard</a>
        </div>
        `;
    }

    return `
        <div>
            <h1>Home</h1>
            <a href="/login" data-link>Login</a>
            <a href="/register" data-link>Register</a>
        </div>
        `;
  }
}
