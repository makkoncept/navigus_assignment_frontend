import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
  constructor(params) {
    super(params);
    this.setTitle("Login");
  }

  async getHtml() {
    return `
            <div class="register-form"
                <h1>Register</h1>
                <label for="username"><b>Username</b></label>
                <input type="text" placeholder="Enter Username" name="username" id="register-username-input">  
                <label for="password"><b>Username</b></label>
                <input type="text" placeholder="Enter Password" name="password" id="register-password-input">  
                <button class="register-button">Register</button>
            </div>
        `;
  }
}
