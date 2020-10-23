import { appObject, getApiUrl } from "../base.js";
import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
  constructor(params) {
    super(params);
    this.setTitle("Courses");
  }

  async getHtml() {
    const url = getApiUrl("courses");
    const username = "mayank";
    const password = "nader";
    const response = await fetch(url, {
      method: ["GET"],
      headers: {
        Authorization: "Basic " + btoa(username + ":" + password),
      },
    });

    const data = await response.json();

    const div = document.createElement("div");
    data.results.forEach((course) => {
      console.log(course);
      const p = document.createElement("p");

      const anchor = document.createElement("a");
      // TODO: finish edit functionality
      if (appObject.getItem("role") === "teacher") {
        anchor.setAttribute("data-course-id", course.id);
        anchor.text = "Add Question";
        anchor.classList.add("open-question-form-modal");
      } else {
        anchor.text = "Take Quiz";
      }

      p.innerText = course.course_code;
      if (anchor) p.appendChild(anchor);
      div.appendChild(p);
    });

    const WrapperDiv = document.createElement("div");
    WrapperDiv.appendChild(div);

    if (appObject.getItem("role") === "teacher") {
      return `
            <h1>Courses</h1>
            <a href="/newcourse" data-link>Create New Course</a>
            ${WrapperDiv.innerHTML}
        `;
    } else {
      return `
            <h1>Courses</h1>
            ${WrapperDiv.innerHTML}
        `;
    }
  }
}
