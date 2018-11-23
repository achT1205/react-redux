import expect from "expect";
import { authorsFormattedForDropdown } from "./selectors";

describe("Author Selectors", () => {
  describe("authorsFormattedForDropdown", () => {
    it("", () => {
      const authors = [
        {
          id: "cory-house",
          firstName: "Cory",
          lastName: "House"
        },
        {
          id: "scott-allen",
          firstName: "Scott",
          lastName: "Allen"
        }
      ];

      const expected = [
        {
          value: "cory-house",
          text: "Cory House"
        },
        {
          value: "scott-allen",
          text: "Scott Allen"
        }
      ];
      expect(authorsFormattedForDropdown(authors)).toEqual(expected);
    });
  });
});
