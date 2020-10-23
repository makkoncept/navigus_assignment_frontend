import { navigateTo } from ".";
import { appObject, elements, getApiUrl } from "./base";
import { showNotification } from "./utils";

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
  if (event.target.id === "register-button") {
    console.log("inside event listeren");
    const username = document.getElementById("register-username-input").value;
    const password = document.getElementById("register-password-input").value;
    const role = document.getElementById("register-dropdown").value;

    if (!username || !password || !role) {
      alert("Error: Empty username or password or role");
      throw Error("empty username or password or role");
    }

    const data = {
      username,
      password,
      role,
    };

    const response = await postData(role === "student" ? getApiUrl("students") : getApiUrl("teachers"), data);
    console.log(response);

    if (response.status === 200) {
      navigateTo("/login");
      showNotification("successfully registered");
    } else {
      const data = await response.json();
      const message = data.message;
      alert(`${message}`);
      throw new Error("409 Conflict");
    }
  }
}

async function handleLogin(event) {
  console.log("clicked");
  console.log(event.target);
  if (event.target.id === "login-button") {
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

    const response = await postData(getApiUrl("login"), data);
    const receivedData = await response.json();
    if (response.status === 200) {
      const { username, password, role } = receivedData.results;
      appObject.setItem("username", username);
      appObject.setItem("password", password);
      appObject.setItem("role", role);
      appObject.setItem("isLoggedIn", "true");

      navigateTo("/dashboard");
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
      // clearing the appObject (reference to localStorage)
      appObject.clear();
      navigateTo("/");
    } else {
      alert("invalid action");
    }

    console.log(appObject);
  }
}

async function handleNewCourse(event) {
  if (event.target.id === "new-course-button") {
    const courseCode = document.getElementById("course-code-input").value;
    const name = document.getElementById("name-input").value;
    const passingMarks = document.getElementById("passing-marks-input").value;

    if (!courseCode || !name || !passingMarks) {
      alert("Error: Missing entries in form");
      throw Error("Missing entries in form");
    }

    const data = {
      course_code: courseCode,
      passing_marks: passingMarks,
      name,
    };

    const response = await postData(getApiUrl("courses"), data);
    console.log(response);

    // the api sends HTTP 201(created) on success
    if (response.status === 201) {
      showNotification("New Course Made", 3000);
      navigateTo("/courses");
    } else if (response.status == 409) {
      const data = await response.json();
      const message = data.message;
      alert(`${message}`);
    } else {
      alert(`Some error occured: ${response.status}`);
    }
  }
}

export default function addListeners() {
  elements.app.addEventListener("click", handleRegister);
  elements.app.addEventListener("click", handleLogin);
  elements.app.addEventListener("click", handleLogout);
  elements.app.addEventListener("click", handleNewCourse);
}
