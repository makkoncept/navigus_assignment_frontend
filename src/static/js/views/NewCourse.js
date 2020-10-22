import { appObject } from "../base.js";
import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
  constructor(params) {
    super(params);
    this.setTitle("New Course");
  }

  async getHtml() {
    if (appObject.getItem("isLoggedIn") === "true" && appObject.getItem("role") === "teacher") {
      return `
        <h1>New Course</h1>
            <label for="course-code"><b>Course Code</b></label>
            <input type="text" placeholder="CS101" name="course-code" id="course-code-input">  
            <label for="name"><b>Course Name</b></label>
            <input type="text" placeholder="Introduction to Computer Science" name="password" id="name-input">  
            <button class="new-course-button">Create</button>
        `;
    } else {
      alert("unauthorized");
      window.location = "/";
    }
  }
}
