// import { Injectable } from '@nestjs/common';
// import { InjectModel } from '@nestjs/mongoose';
// import { Model } from 'mongoose';
// import { Book } from './book.schema';

// @Injectable()
// export class BooksService {
//   constructor(@InjectModel(Book.name) private bookModel: Model<Book>) {}

//   async create(title: string, author: string, publishedYear: number, genre: string): Promise<Book> {
//     const book = new this.bookModel({ title, author, publishedYear, genre });
//     return book.save();
//   }

//   async findAll(): Promise<Book[]> {
//     return this.bookModel.find().exec();
//   }

//   async findOne(id: string): Promise<Book | null> { // Changed to Book | null
//     return this.bookModel.findById(id).exec();
//   }

//   async update(id: string, title: string, author: string, publishedYear: number, genre: string): Promise<Book | null> { // Changed to Book | null
//     return this.bookModel.findByIdAndUpdate(
//       id,
//       { title, author, publishedYear, genre },
//       { new: true } // Return the updated document
//     ).exec();
//   }

//   async delete(id: string): Promise<Book | null> { // Changed to Book | null
//     return this.bookModel.findByIdAndDelete(id).exec();
//   }

//   async search(query: string): Promise<Book[]> {
//     return this.bookModel.find({
//       $or: [
//         { title: { $regex: query, $options: 'i' } },
//         { author: { $regex: query, $options: 'i' } },
//         { genre: { $regex: query, $options: 'i' } },
//       ],
//     }).exec();
//   }
// }

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Book } from './book.schema';

@Injectable()
export class BooksService {
  constructor(@InjectModel(Book.name) private bookModel: Model<Book>) {}

  async create(title: string, author: string, publishedYear: number, genre: string): Promise<Book> {
    const book = new this.bookModel({ title, author, publishedYear, genre });
    return book.save();
  }

  async findAll(limit: number = 10, offset: number = 0): Promise<Book[]> {
    return this.bookModel.find().skip(offset).limit(limit).exec();
  }

  async findOne(id: string): Promise<Book | null> {
    return this.bookModel.findById(id).exec();
  }

  async update(id: string, title: string, author: string, publishedYear: number, genre: string): Promise<Book | null> {
    return this.bookModel.findByIdAndUpdate(
      id,
      { title, author, publishedYear, genre },
      { new: true }
    ).exec();
  }

  async delete(id: string): Promise<Book | null> {
    return this.bookModel.findByIdAndDelete(id).exec();
  }

  async search(query: string): Promise<Book[]> {
    return this.bookModel.find({
      $or: [
        { title: { $regex: query, $options: 'i' } },
        { author: { $regex: query, $options: 'i' } },
        { genre: { $regex: query, $options: 'i' } },
      ],
    }).exec();
  }
}