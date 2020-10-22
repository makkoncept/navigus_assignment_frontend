import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
  constructor(params) {
    super(params);
    this.setTitle("Login");
  }

  async getHtml() {
    function handleLogin(event) {
      const usernameInput = document.getElementById("username-input");
      const passwordInput = document.getElementById("password-input");
      // client side validation
    }

    const button = document.createElement("button");
    button.classList.add("login-button");
    button.addEventListener("click", handleLogin);
    console.log("trying navigate to");
    // navigateTo("/register");

    return `
            <h1>Login</h1>
            <label for="username"><b>Username</b></label>
            <input type="text" placeholder="Enter Username" name="username" id="username-input" required>  
            <label for="password"><b>Username</b></label>
            <input type="text" placeholder="Enter Password" name="password" id="password-input" required>  
            <button class="login-button">Login</button>
        `;
  }
}
