import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema()
export class Book extends Document {
  declare _id: Types.ObjectId; // Use 'declare' to type the inherited _id

  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  author: string;

  @Prop({ required: true })
  publishedYear: number;

  @Prop({ required: true })
  genre: string;
}

export const BookSchema = SchemaFactory.createForClass(Book);