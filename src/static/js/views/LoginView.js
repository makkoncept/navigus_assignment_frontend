import AbstractView from "./AbstractView";
import { appObject } from "../base";
import { navigateTo } from "..";

export default class extends AbstractView {
  constructor(params) {
    super(params);
    this.setTitle("Login");
  }

  async getHtml() {
    if (appObject.getItem("isLoggedIn") === "true") {
      navigateTo("/dashboard");
    }

    return `
            <h1 class="title">Login</h1>
            <div class="field">
              <label class="label" for="username">Username</label>
              <div class="control">
                <input class="input" type="text" name="username" placeholder="Enter Username" id="login-username-input">
              </div>
            </div>
            <div class="field">
              <label class="label" for="password">Password</label>
              <div class="control">
                <input class="input" type="text" name="password" placeholder="Enter Password" id="login-password-input">
              </div>
            </div>
            <div class="field">
              <div class="control">
                <div class="select">
                  <select id="login-dropdown" name="role">
                    <option value="student">Student</option>
                    <option value="teacher">Teacher</option>
                  </select>
                </div>
              </div>
            </div>
            <div class="field">
              <div class="control">
                <button class="button is-primary" id="login-button">Login</button>
              </div>
            </div>
        `;
  }
}
