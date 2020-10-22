import { appObject, elements } from "./base";

async function postData(url = "", data = {}) {
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return response;
}

async function handleRegister(event) {
  console.log("clicked");
  console.log(event.target);
  if (event.target.classList.contains("register-button")) {
    console.log("inside event listeren");
    const usernameInput = document.getElementById("register-username-input");
    const passwordInput = document.getElementById("register-password-input");
    const dropDown = document.getElementById("register-dropdown");

    if (!usernameInput.value || !passwordInput.value || !dropDown.value) {
      alert("Error: Empty username or password or role");
      throw Error("empty username or password or role");
    }

    const data = {
      username: usernameInput.value,
      password: passwordInput.value,
      role: dropDown.value,
    };

    const response = await postData("http://localhost:5000/students/", data);
    console.log(response);
  }
}

async function handleLogin(event) {
  console.log("clicked");
  console.log(event.target);
  if (event.target.classList.contains("login-button")) {
    const usernameInput = document.getElementById("login-username-input");
    const passwordInput = document.getElementById("login-password-input");
    const dropDown = document.getElementById("login-dropdown");
    if (!usernameInput.value || !passwordInput.value || !dropDown.value) {
      alert("Error: Empty username or password or role");
      throw Error("empty username or password or role");
    }
    const data = {
      username: usernameInput.value,
      password: passwordInput.value,
      role: dropDown.value,
    };

    const response = await postData("http://localhost:5000/login/", data);
    const receivedData = await response.json();
    if (response.status === 200) {
      const { username, password, role } = receivedData.results;
      appObject.setItem("username", username);
      appObject.setItem("password", password);
      appObject.setItem("role", role);

      window.location = "/dashboard";
    } else {
      alert(`${receivedData.message}`);
    }

    console.log(appObject);
  }
}

async function handleLogout(event) {
  console.log("clicked");
  console.log(event.target);
  if (event.target.id == "logout-link") {
    if (appObject.getItem("username") && appObject.getItem("password")) {
      appObject.clear();
      window.location = "/";
    } else {
      alert("invalid action");
    }

    console.log(appObject);
  }
}

export default function addListeners() {
  elements.app.addEventListener("click", handleRegister);
  elements.app.addEventListener("click", handleLogin);
  elements.app.addEventListener("click", handleLogout);
}
