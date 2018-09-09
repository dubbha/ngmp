import { AuthorInterface } from './author.interface';

export class Author implements AuthorInterface {
  constructor(
    public id: string,
    public name: string,
  ) {}
}
