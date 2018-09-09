import { Course, Author } from '../../models';

export interface QueryAndStart {
  query: string;
  start: number;
}

export interface CoursesState {
  readonly courses: Course[];
  readonly authors: Author[];
  readonly course: Course;
  readonly queryAndStart: QueryAndStart;
  readonly isLoading: boolean;
}

export const initialCoursesState: CoursesState = {
  courses: [],
  authors: [],
  course: null,
  queryAndStart: { query: '', start: 0 },
  isLoading: false,
};
