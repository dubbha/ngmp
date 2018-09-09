import { Pipe, PipeTransform } from '@angular/core';
import { Course } from '../models';

const numericSort = (a: Course, b: Course, key: string, order: string): number => {
  if (order === 'asc') {
    return a[key] - b[key];
  }
  return b[key] - a[key];
};

const stringSort = (a: Course, b: Course, key: string, order: string): 0 | 1 | -1 => {
  if (a[key] === b[key]) {
    return 0;
  }
  if (order === 'asc') {
    return a[key] > b[key] ? 1 : -1;
  }
  return a[key] > b[key] ? -1 : 1;
};

const booleanSort = (a: Course, b: Course, key: string, order: string): 0 | 1 | -1 => {
  if (a[key] === b[key]) {
    return 0;
  }
  if (order === 'asc') {
    return a[key] ? 1 : -1;
  }
  return a[key] ? -1 : 1;
};

@Pipe({
  name: 'orderBy',
  // pure: true;    // pipes are pure by default
})
export class OrderByPipe implements PipeTransform {

  transform(courses: Course[], key = 'creationDate', order = 'desc'): Course[] {
    const arr = [...courses];    // keep it pure

    return arr.sort((a: Course, b: Course): number => {
      switch (typeof(a[key])) {
        case 'number':
          return numericSort(a, b, key, order);

        case 'string':
          return stringSort(a, b, key, order);

        case 'boolean':
          return booleanSort(a, b, key, order);

        default:    // do not attempt to sort complex types
          return 0;
      }
    });
  }

}
