import { Pipe, PipeTransform } from '@angular/core';
import { Course } from '../models';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(courses: Course[], query = ''): Course[] {
    const arr = [...courses];             // keep it pure
    const re = new RegExp(query, 'i');    // case insensitive query regexp

    return arr.filter(e => re.test(e.title));
  }

}
