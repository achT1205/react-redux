import React, { PropTypes } from "react";
import CourseListRow from "./CourseListRow";

const ClourseList = ({ courses}) => {
  return (
    <table className="table">
      <thead>
        <tr>
        <th>{" "}</th>
          <th>Title</th>
          <th>Author </th>
          <th>Category </th>
          <th>Length </th>
        </tr>
      </thead>
      <tbody>
        {courses.map(course => (
          <CourseListRow key={course.id} course={course} />
        ))}
      </tbody>
    </table>
  );
};

ClourseList.propTypes = {
    courses : PropTypes.array.isRequired
};

export default ClourseList;

