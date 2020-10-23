import { appObject } from "../base.js";
import { navigateTo } from "../index.js";
import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
  constructor(params) {
    super(params);
    this.setTitle("Login");
  }

  async getHtml() {
    if (appObject.getItem("isLoggedIn") === "true") {
      navigateTo("/dashboard");
    }

    //TODO: make a general form for this and login view
    return `
            <h1 class="title">Register</h1>
            <div class="field">
              <label class="label" for="username">Username</label>
              <div class="control">
                <input class="input" type="text" name="username" placeholder="Enter Username" id="register-username-input">
              </div>
            </div>
            <div class="field">
              <label class="label" for="password">Password</label>
              <div class="control">
                <input class="input" type="text" name="password" placeholder="Enter Password" id="register-password-input">
              </div>
            </div>
            <div class="field">
              <div class="control">
                <div class="select">
                  <select id="register-dropdown" name="role">
                    <option value="student">Student</option>
                    <option value="teacher">Teacher</option>
                  </select>
                </div>
              </div>
            </div>
            <div class="field">
              <div class="control">
                <button class="button is-primary" id="register-button">Register</button>
              </div>
            </div>
        `;
  }
}
