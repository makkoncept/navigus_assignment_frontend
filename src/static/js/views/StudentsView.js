import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
  constructor(params) {
    super(params);
    this.setTitle("Students");
  }

  async getHtml() {
    const url = "http://localhost:5000/students/";
    const username = "mayank";
    const password = "nader";
    const response = await fetch(url, {
      method: ["GET"],
      headers: {
        Authorization: "Basic " + btoa(username + ":" + password),
      },
    });

    console.log(response);

    const data = await response.json();
    console.log(data);

    const div = document.createElement("div");
    data.results.forEach((user) => {
      console.log(user);
      console.log(user.username);
      const p = document.createElement("p");
      p.innerText = user.username;
      div.appendChild(p);
    });

    const WrapperDiv = document.createElement("div");
    WrapperDiv.appendChild(div);
    console.log(div);

    console.log("after");

    return `
            <h1>Students</h1>
            ${WrapperDiv.innerHTML}
            <p>Manage your privacy and configuration.</p>
        `;
  }
}
