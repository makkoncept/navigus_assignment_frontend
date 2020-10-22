import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
  constructor(params) {
    super(params);
    this.setTitle("Login");
  }

  async getHtml() {
    function handleRegister(event) {
      console.log("inside event listeren");
      const usernameInput = document.getElementById("register-username-input");
      const passwordInput = document.getElementById("register-password-input");
      // client side validation
      console.log(usernameInput, passwordInput);
    }

    const button = document.createElement("button");
    button.innerText = "Register";
    button.classList.add("register-button");
    button.addEventListener("click", handleRegister);

    console.log("yo");
    const buttonWrapper = document.createElement("div");
    buttonWrapper.appendChild(button);

    return `
            <div class="register-form"
                <h1>Register</h1>
                <label for="username"><b>Username</b></label>
                <input type="text" placeholder="Enter Username" name="username" id="register-username-input" required>  
                <label for="password"><b>Username</b></label>
                <input type="text" placeholder="Enter Password" name="password" id="register-password-input" required>  
                ${buttonWrapper.innerHTML}
            </div>
        `;
  }
}
