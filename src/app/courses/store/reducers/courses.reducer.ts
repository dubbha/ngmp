import { CoursesActionTypes, CoursesActions } from '../actions';
import { CoursesState, initialCoursesState } from '../state/courses.state';

export function authReducer(
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
        isAuthenticated: true,
        isLoading: false,
      };

    case CoursesActionTypes.GET_COURSES_ERROR:
      return {
        ...state,
        isLoading: false,
      };

    default: {
      return state;
    }
  }
}
