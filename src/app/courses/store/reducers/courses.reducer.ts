import { CoursesActionTypes, CoursesActions } from '../actions';
import { CoursesState, initialCoursesState } from '../state/courses.state';

export function coursesReducer(
  state = initialCoursesState,
  action: CoursesActions,
): CoursesState {
  switch (action.type) {
    case CoursesActionTypes.GET_COURSES:
      return {
        ...state,
        isLoading: true,
      };

    case CoursesActionTypes.GET_COURSES_SUCCESS:
      return {
        ...state,
        courses: action.payload,
        isLoading: false,
      };

    case CoursesActionTypes.GET_COURSES_ERROR:
      return {
        ...state,
        isLoading: false,
      };

    case CoursesActionTypes.GET_COURSE:
      return {
        ...state,
        isLoading: true,
      };

    case CoursesActionTypes.GET_COURSE_SUCCESS:
      console.log(action);
      return {
        ...state,
        course: action.payload,
        isLoading: false,
      };

    case CoursesActionTypes.GET_COURSE_ERROR:
      return {
        ...state,
        isLoading: false,
      };

    case CoursesActionTypes.RESET_COURSE:
      console.log(action);
      return {
        ...state,
        course: null,
        isLoading: false,
      };

    case CoursesActionTypes.SET_QUERY_AND_START:
      return {
        ...state,
        queryAndStart: action.payload,
      };

    default: {
      return state;
    }
  }
}
