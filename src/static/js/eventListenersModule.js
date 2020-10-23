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

async function handleNewQuestion(event) {
  if (event.target.id === "new-question-button") {
    const questionText = document.getElementById("question-text").value;
    const optionFields = Array.from(elements.modalOptionWrapper.querySelectorAll(".field"));

    if (!questionText) {
      alert("Error: Missing entries in form");
      throw Error("Missing entries in form");
    }

    // required data schema
    // {
    //   "text": "question text",
    //   "options": [
    //     {
    //       "text": "option 1"
    //       "is_true": true,
    //     },
    //     {
    //       "text": "option 2"
    //       "is_true": false,
    //     }
    //   ]
    // }

    const data = {
      text: questionText,
      options: [],
    };

    // going throught the options and filling the data object
    optionFields.forEach((option) => {
      // console.log(option);
      const optionText = option.querySelector(".option-text").value;
      const is_true = option.querySelector(".option-dropdown").value === "true";

      // if any of them is empty, notify user
      if (!optionText || is_true === undefined) {
        alert("Error: Missing entries in form");
        throw Error("Missing entries in form");
      }

      data.options.push({ text: optionText, is_true });
    });

    // console.log(data)
    const course_id = elements.modal.getAttribute("data-course-id");
    // post request to /quiz/<int:course_id> needs to be made to add
    // question to the particular course
    const response = await postData(`${getApiUrl("quiz")}${course_id}`, data);

    elements.closeModalButton.click();

    if (response.status === 201) {
      showNotification("Question Added", 3000);
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

// returns the html markup for an option
function getOptionHtml(count) {
  return `<div class="field">
      <label class="label">Option ${count} Text</label>
      <div class="control">
        <input class="input option-text" type="text" placeholder="Write your option here" />
      </div>
      <div class="control">
        <div class="select">
          <select class="option-dropdown">
            <option value="true">True</option>
            <option value="false">False</option>
          </select>
        </div>
      </div>
    </div>`;
}

// for adding more option input fields
async function handleLoadMoreOption(event) {
  if (event.target.id === "load-more-option-button") {
    const optionFields = elements.modalOptionWrapper.querySelectorAll(".field");
    const count = optionFields.length;

    // TODO: figure out a way to persist data in existing input fields
    elements.modalOptionWrapper.innerHTML += getOptionHtml(count + 1);
  }
}

function handleCloseModal() {
  // changing to default state before closing
  elements.modalOptionWrapper.innerHTML = getOptionHtml(1);
  elements.modal.querySelector("#question-text").value = "";

  // "closing"
  elements.modal.classList.remove("is-active");
}

function handleOpenModal(event) {
  if (event.target.classList.contains("open-question-form-modal")) {
    elements.modal.classList.add("is-active");
    // saving course id so that post request can be sent to /quiz/<course_id>
    elements.modal.setAttribute("data-course-id", event.target.getAttribute("data-course-id"));
  }
}

export default function addListeners() {
  elements.app.addEventListener("click", handleRegister);
  elements.app.addEventListener("click", handleLogin);
  elements.app.addEventListener("click", handleLogout);
  elements.app.addEventListener("click", handleNewCourse);
  elements.app.addEventListener("click", handleOpenModal);

  elements.modal.addEventListener("click", handleLoadMoreOption);
  elements.modal.addEventListener("click", handleNewQuestion);
  elements.closeModalButton.addEventListener("click", handleCloseModal);
}
