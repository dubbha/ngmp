export interface CourseInterface {
  id: number;
  creationDate: number;   // Unix epoch, msecs
  title: string;
  durationMin?: number;
  description?: string;
}
