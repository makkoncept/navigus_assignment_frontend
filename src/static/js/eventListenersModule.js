async function postData(url = "", data = {}) {
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return response.json();
}

async function handleRegister(event) {
  console.log("clicked");
  console.log(event.target);
  if (event.target.classList.contains("register-button")) {
    console.log("inside event listeren");
    const usernameInput = document.getElementById("register-username-input");
    const passwordInput = document.getElementById("register-password-input");
    console.log(usernameInput, passwordInput);

    const data = {
      username: usernameInput.value,
      password: passwordInput.value,
    };
    const response = await postData("http://localhost:5000/students/", data);
    console.log(response);
  }
}

export default function addListeners() {
  const app = document.getElementById("app");

  app.addEventListener("click", handleRegister);
}
