import { OrderByPipe } from './order-by.pipe';
import { Course } from '../models';

describe('OrderByPipe', () => {
  const pipe = new OrderByPipe();

  const courses: Course[] = [
    { id: 1, creationDate: 111, title: 'C', durationMin: 200, description: 'CCC', topRated: false },
    { id: 3, creationDate: 333, title: 'A', durationMin: 300, description: 'AAA', topRated: true },
    { id: 2, creationDate: 222, title: 'B', durationMin: 100, description: 'BBB', topRated: false },
  ];

  it('should instantiate successfully', () => {
    expect(pipe).toBeTruthy();
  });

  it('should sort by creationDate descending by default', () => {
    expect(pipe.transform(courses)).toEqual([
      { id: 3, creationDate: 333, title: 'A', durationMin: 300, description: 'AAA', topRated: true },
      { id: 2, creationDate: 222, title: 'B', durationMin: 100, description: 'BBB', topRated: false },
      { id: 1, creationDate: 111, title: 'C', durationMin: 200, description: 'CCC', topRated: false },
    ]);
  });

  it('should sort descending by default', () => {
    expect(pipe.transform(courses, 'creationDate')).toEqual([
      { id: 3, creationDate: 333, title: 'A', durationMin: 300, description: 'AAA', topRated: true },
      { id: 2, creationDate: 222, title: 'B', durationMin: 100, description: 'BBB', topRated: false },
      { id: 1, creationDate: 111, title: 'C', durationMin: 200, description: 'CCC', topRated: false },
    ]);
  });

  it('should sort ascending if order parameter set to asc', () => {
    expect(pipe.transform(courses, 'creationDate', 'asc')).toEqual([
      { id: 1, creationDate: 111, title: 'C', durationMin: 200, description: 'CCC', topRated: false },
      { id: 2, creationDate: 222, title: 'B', durationMin: 100, description: 'BBB', topRated: false },
      { id: 3, creationDate: 333, title: 'A', durationMin: 300, description: 'AAA', topRated: true },
    ]);
  });

  it('should sort by string ascending', () => {
    expect(pipe.transform(courses, 'title', 'asc')).toEqual([
      { id: 3, creationDate: 333, title: 'A', durationMin: 300, description: 'AAA', topRated: true },
      { id: 2, creationDate: 222, title: 'B', durationMin: 100, description: 'BBB', topRated: false },
      { id: 1, creationDate: 111, title: 'C', durationMin: 200, description: 'CCC', topRated: false },
    ]);
  });

  it('should sort by string descending', () => {
    expect(pipe.transform(courses, 'title', 'desc')).toEqual([
      { id: 1, creationDate: 111, title: 'C', durationMin: 200, description: 'CCC', topRated: false },
      { id: 2, creationDate: 222, title: 'B', durationMin: 100, description: 'BBB', topRated: false },
      { id: 3, creationDate: 333, title: 'A', durationMin: 300, description: 'AAA', topRated: true },
    ]);
  });

  it('should sort by number ascending', () => {
    expect(pipe.transform(courses, 'durationMin', 'asc')).toEqual([
      { id: 2, creationDate: 222, title: 'B', durationMin: 100, description: 'BBB', topRated: false },
      { id: 1, creationDate: 111, title: 'C', durationMin: 200, description: 'CCC', topRated: false },
      { id: 3, creationDate: 333, title: 'A', durationMin: 300, description: 'AAA', topRated: true },
    ]);
  });

  it('should sort by number descending', () => {
    expect(pipe.transform(courses, 'durationMin', 'desc')).toEqual([
      { id: 3, creationDate: 333, title: 'A', durationMin: 300, description: 'AAA', topRated: true },
      { id: 1, creationDate: 111, title: 'C', durationMin: 200, description: 'CCC', topRated: false },
      { id: 2, creationDate: 222, title: 'B', durationMin: 100, description: 'BBB', topRated: false },
    ]);
  });

  it('should sort by boolean ascending', () => {
    expect(pipe.transform([
      { id: 1, creationDate: 111, title: 'C', durationMin: 200, description: 'CCC', topRated: false },
      { id: 2, creationDate: 222, title: 'B', durationMin: 100, description: 'BBB', topRated: true },
      { id: 3, creationDate: 333, title: 'A', durationMin: 300, description: 'AAA', topRated: false },
    ], 'topRated', 'asc')).toEqual([
      { id: 1, creationDate: 111, title: 'C', durationMin: 200, description: 'CCC', topRated: false },
      { id: 3, creationDate: 333, title: 'A', durationMin: 300, description: 'AAA', topRated: false },
      { id: 2, creationDate: 222, title: 'B', durationMin: 100, description: 'BBB', topRated: true },
    ]);
  });

  it('should sort by boolean descending', () => {
    expect(pipe.transform([
      { id: 1, creationDate: 111, title: 'C', durationMin: 200, description: 'CCC', topRated: true },
      { id: 2, creationDate: 222, title: 'B', durationMin: 100, description: 'BBB', topRated: false },
      { id: 3, creationDate: 333, title: 'A', durationMin: 300, description: 'AAA', topRated: true },
    ], 'topRated', 'desc')).toEqual([
      { id: 1, creationDate: 111, title: 'C', durationMin: 200, description: 'CCC', topRated: true },
      { id: 3, creationDate: 333, title: 'A', durationMin: 300, description: 'AAA', topRated: true },
      { id: 2, creationDate: 222, title: 'B', durationMin: 100, description: 'BBB', topRated: false },
    ]);
  });

  it('should not attempt to sort by complex types', () => {
    const modified = courses.map(c => ({ ...c, complex: { title: c.title } }));

    expect(pipe.transform(modified, 'complex')).toEqual(modified);
  });

  it('should not change the order when sorting by string and sorting field values are equal', () => {
    const noSortingNeeded = [
      { id: 3, creationDate: 333, title: 'A', durationMin: 300, description: 'AAA', topRated: true },
      { id: 2, creationDate: 222, title: 'B', durationMin: 100, description: 'AAA', topRated: false },
      { id: 1, creationDate: 111, title: 'C', durationMin: 200, description: 'AAA', topRated: false },
    ];

    expect(pipe.transform(noSortingNeeded, 'description')).toEqual(noSortingNeeded);
  });

  it('should not change the order when sorting by boolean and sorting field values are equal', () => {
    const noSortingNeeded = [
      { id: 3, creationDate: 333, title: 'A', durationMin: 300, description: 'AAA', topRated: true },
      { id: 2, creationDate: 222, title: 'B', durationMin: 100, description: 'BBB', topRated: true },
      { id: 1, creationDate: 111, title: 'C', durationMin: 200, description: 'CCC', topRated: true },
    ];

    expect(pipe.transform(noSortingNeeded, 'topRated')).toEqual(noSortingNeeded);
  });

});
