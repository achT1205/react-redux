import expect from "expect"; //assertion librairy
import React from "react";
import { mount, shallow } from "enzyme";
import { ManageCoursePage } from "./ManageCoursePage";

describe("Manage Course Page", () => {
  it("sets message when trying to save empty title", () => {
    const props = {
      authors:[],
      actions:{saveCourse:()=>{return Promise.resolve();}},
      course: {
        id: "",
        title: "",
        watchHref: "",
        authorId: "",
        length: "",
        category: ""
      }
    };
    const wrapper = mount(<ManageCoursePage {...props} />); // create an extence of the compponent
    const saveButton = wrapper.find("input").last();
    expect(saveButton.prop("type")).toBe("submit");
    saveButton.simulate("click");
    expect(wrapper.state().errors.title).toBe('Title must be at least 5 characters.');
  });
});
