import { Course } from '../../course-list/course-list-item/course.model';

export interface CoursesState {
  readonly courses: Course[],
  readonly isLoading: boolean;
}

export const initialCoursesState: CoursesState = {
  courses: [],
  isLoading: false,
};
