

import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { BooksService } from './books.service';
import { Book } from './book.dto';

@Resolver(() => Book)
export class BooksResolver {
  constructor(private booksService: BooksService) {}

  @Query(() => [Book])
  async books(
    @Args('limit', { type: () => Int, defaultValue: 10 }) limit: number, // Add limit with default
    @Args('offset', { type: () => Int, defaultValue: 0 }) offset: number, // Add offset with default
  ): Promise<Book[]> {
    const books = await this.booksService.findAll(limit, offset);
    return books.map(book => ({
      id: book._id.toString(),
      title: book.title,
      author: book.author,
      publishedYear: book.publishedYear,
      genre: book.genre,
    }));
  }

  @Query(() => Book)
  async book(@Args('id') id: string): Promise<Book> {
    const book = await this.booksService.findOne(id);
    if (!book) throw new Error('Book not found');
    return {
      id: book._id.toString(),
      title: book.title,
      author: book.author,
      publishedYear: book.publishedYear,
      genre: book.genre,
    };
  }

  @Query(() => [Book])
  async searchBooks(@Args('query') query: string): Promise<Book[]> {
    const books = await this.booksService.search(query);
    return books.map(book => ({
      id: book._id.toString(),
      title: book.title,
      author: book.author,
      publishedYear: book.publishedYear,
      genre: book.genre,
    }));
  }

  @Mutation(() => Book)
  async createBook(
    @Args('title') title: string,
    @Args('author') author: string,
    @Args('publishedYear', { type: () => Int }) publishedYear: number,
    @Args('genre') genre: string,
  ): Promise<Book> {
    const book = await this.booksService.create(title, author, publishedYear, genre);
    return {
      id: book._id.toString(),
      title: book.title,
      author: book.author,
      publishedYear: book.publishedYear,
      genre: book.genre,
    };
  }

  @Mutation(() => Book)
  async updateBook(
    @Args('id') id: string,
    @Args('title') title: string,
    @Args('author') author: string,
    @Args('publishedYear', { type: () => Int }) publishedYear: number,
    @Args('genre') genre: string,
  ): Promise<Book> {
    const book = await this.booksService.update(id, title, author, publishedYear, genre);
    if (!book) throw new Error('Book not found');
    return {
      id: book._id.toString(),
      title: book.title,
      author: book.author,
      publishedYear: book.publishedYear,
      genre: book.genre,
    };
  }

  @Mutation(() => Book)
  async deleteBook(@Args('id') id: string): Promise<Book> {
    const book = await this.booksService.delete(id);
    if (!book) throw new Error('Book not found');
    return {
      id: book._id.toString(),
      title: book.title,
      author: book.author,
      publishedYear: book.publishedYear,
      genre: book.genre,
    };
  }
}