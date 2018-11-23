import React, { PropTypes } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as coursActions from "../../actions/coursActions";
import CourseForm from "./CourseForm";
import toastr from "toastr";
import { authorsFormattedForDropdown } from "../../selectors/selectors";

export class ManageCoursePage extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      course: Object.assign({}, this.props.course),
      errors: {},
      saving: false
    };
    this.updateCourseState = this.updateCourseState.bind(this);
    this.saveCourse = this.saveCourse.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.course.id != nextProps.course.id) {
      // Necessary to populate from when existing course is loaded directly.
      this.setState({ course: Object.assign({}, nextProps.course) });
    }
  }

  updateCourseState(event) {
    const field = event.target.name;
    let course = this.state.course;
    course[field] = event.target.value;
    return this.setState({ course: course });
  }

  courseFromISValid() {
    let formIsValid = true;
    let errors = {};

    if (this.state.course.title.length < 5) {
      errors.title = "Title must be at least 5 characters.";
      formIsValid = false;
    }
    this.setState({ errors: errors });
    return formIsValid;
  }

  saveCourse(event) {
    event.preventDefault();
    if (!this.courseFromISValid()) {
      return;
    }
    this.setState({ saving: true });
    this.props.actions
      .saveCourse(this.state.course)
      .then(() => this.redirect())
      .catch(error => {
        toastr.error(error);
        this.setState({ saving: false });
      });
  }

  redirect() {
    this.setState({ saving: false });
    toastr.success("Course saved");
    this.context.router.push("/courses");
  }

  render() {
    return (
      <div>
        <CourseForm
          allAuthors={this.props.authors}
          course={this.state.course}
          errors={this.state.errors}
          onSave={this.saveCourse}
          onChange={this.updateCourseState}
          saving={this.state.saving}
        />
      </div>
    );
  }
}

ManageCoursePage.propTypes = {
  course: PropTypes.object.isRequired,
  authors: PropTypes.array.isRequired,
  // onSave: PropTypes.func.isRequired,
  // onChange: PropTypes.func.isRequired,
  actions: PropTypes.object.isRequired
};

//Pull in the React Router context so router is available on this.context.couter
ManageCoursePage.contextTypes = {
  router: PropTypes.object
};

function getCourseById(courses, id) {
  const course = courses.filter(course => course.id == id);
  if (course) return course[0]; // since filter return an array
  return null;
}
const mapStateToProps = (state, ownProps) => {
  const couseId = ownProps.params.id; // from the path `/course/:id`
  let course = {
    id: "",
    title: "",
    watchHref: "",
    authorId: "",
    length: "",
    category: ""
  };
  if (couseId && state.courses.length > 0) {
    course = getCourseById(state.courses, couseId);
  }

  return {
    course: course,
    authors: authorsFormattedForDropdown(state.authors)
  };
};

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(coursActions, dispatch)
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ManageCoursePage);
