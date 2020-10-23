import { appObject } from "../base.js";
import { navigateTo } from "../index.js";
import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
  constructor(params) {
    super(params);
    this.setTitle("New Course");
  }

  async getHtml() {
    if (appObject.getItem("isLoggedIn") === "true" && appObject.getItem("role") === "teacher") {
      return `
            <h1 class="title">New Course</h1>
            <div class="field">
              <label class="label" for="course-code">Course Code</label>
              <div class="control">
                <input class="input" type="text" name="course-code" placeholder="CS101" id="course-code-input">
              </div>
            </div>
            <div class="field">
              <label class="label" for="name">Course Name</label>
              <div class="control">
                <input class="input" type="text" name="name" placeholder="Introduction to Computer Science" id="name-input">
              </div>
            </div>
            <div class="field">
              <label class="label" for="passing-marks">Course Name</label>
              <div class="control">
                <input class="input" type="text" name="passing-marks" placeholder="100" id="passing-marks-input">
              </div>
            </div>
            <div class="field">
              <div class="control">
                <button class="button is-primary" id="new-course-button">Create Course</button>
              </div>
            </div>
        `;
    } else {
      alert("unauthorized");
      navigateTo("/");
    }
  }
}
