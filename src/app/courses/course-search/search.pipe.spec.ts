import { SearchPipe } from './search.pipe';
import { Course } from '../models';

describe('SearchPipe', () => {
  const haystack: Course[] = [
    { id: 1, creationDate: 111, title: 'abc', durationMin: 120, description: '' },
    { id: 2, creationDate: 222, title: 'bcd', durationMin: 120, description: '' },
    { id: 3, creationDate: 333, title: 'cde', durationMin: 120, description: '' },
  ];

  it('create an instance', () => {
    const pipe = new SearchPipe();
    expect(pipe).toBeTruthy();
  });

  it('should return the full courses collection by default', () => {
    const pipe = new SearchPipe();
    expect(pipe.transform(haystack)).toEqual(haystack);
  });

  it('should return several results if applicable', () => {
    const pipe = new SearchPipe();

    expect(pipe.transform(haystack, 'b')).toEqual([
      haystack[0],
      haystack[1],
    ]);
  });

  it('should return a single match', () => {
    const pipe = new SearchPipe();

    expect(pipe.transform(haystack, 'e')).toEqual([
      haystack[2],
    ]);
  });
});
