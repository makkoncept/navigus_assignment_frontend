import AbstractView from "./AbstractView";
import { appObject } from "../base";

export default class extends AbstractView {
  constructor(params) {
    super(params);
    this.setTitle("Login");
  }

  async getHtml() {
    if (appObject.getItem("username") && appObject.getItem("password")) {
      console.log("app Object verified");
      window.location = "/dashboard";
    }

    return `
            <h1>Login</h1>
            <label for="username"><b>Username</b></label>
            <input type="text" placeholder="Enter Username" name="username" id="login-username-input">  
            <label for="password"><b>Username</b></label>
            <input type="text" placeholder="Enter Password" name="password" id="login-password-input">  
            <select id="login-dropdown" name="role">
              <option value="student">Student</option>
              <option value="teacher">Teacher</option>
            </select>
            <button class="login-button">Login</button>
        `;
  }
}
