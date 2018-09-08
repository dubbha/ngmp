import { Course } from '../../course-list/course-list-item/course.model';

export interface QueryAndStart {
  query: string;
  start: number;
}

export interface CoursesState {
  readonly courses: Course[];
  readonly course: Course;
  readonly queryAndStart: QueryAndStart;
  readonly isLoading: boolean;
}

export const initialCoursesState: CoursesState = {
  courses: [],
  course: null,
  queryAndStart: { query: '', start: 0 },
  isLoading: false,
};
