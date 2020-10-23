import { appObject } from "../base.js";
import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
  constructor(params) {
    super(params);
    this.setTitle("Home");
  }

  async getHtml() {
    console.log(appObject);
    let dynamic = "";
    if (appObject.getItem("isLoggedIn") === "true") {
      dynamic = `<a class="button is-primary" href="/dashboard" data-link>Go back to dashboard</a>`;
    } else {
      dynamic = `<a class="button is-primary" href="/login" data-link>Login</a>
            <a class="button is-link is-light" href="/register" data-link>Register</a>`;
    }

    return `
        <div>
            <h1 class="title">Home</h1>
            <
            ${dynamic}
        </div>
      `;
  }
}
