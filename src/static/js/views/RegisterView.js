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

    return `
            <div class="register-form"
                <h1>Register</h1>
                <label for="username"><b>Username</b></label>
                <input type="text" placeholder="Enter Username" name="username" id="register-username-input">  
                <label for="password"><b>Username</b></label>
                <input type="text" placeholder="Enter Password" name="password" id="register-password-input">  
                <select id="register-dropdown" name="role">
                  <option value="student">Student</option>
                  <option value="teacher">Teacher</option>
                </select>
                <button class="register-button">Register</button>
            </div>
        `;
  }
}
