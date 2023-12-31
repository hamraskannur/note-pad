/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type NoteDocument = HydratedDocument<Note>;

@Schema({
  timestamps: true,
})
export class Note {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  userId: string;

  @Prop({ required: false })
  description: string;

  @Prop({ required: false })
  backgroundColor: string;


  @Prop({ required: false })
  textColor: string;

}

export const NoteSchema = SchemaFactory.createForClass(Note);
