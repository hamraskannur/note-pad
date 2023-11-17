import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Note, NoteDocument } from './schemas/user.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CreateNoteDto } from './dto/CreateNoteDto';
import { NoteInterface } from './interfaces';


@Injectable()
export class UserRepository {
  constructor(@InjectModel(Note.name) private noteModel: Model<NoteDocument>) {}

  async createNote(
    createNoteDto: CreateNoteDto,
    userId: string,
  ): Promise<{ message: string; status: boolean }> {
    try {
      createNoteDto.userId = userId;
      const newNote = new this.noteModel(createNoteDto);
      const NoteCreated = await newNote.save();
      return { message: 'Note Created', status: true };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async getAllNotes(
    userId: string,
  ): Promise<{ message: string; status: boolean; notes: NoteInterface[] }> {
    try {
      const notes = await this.noteModel.find({ userId }).sort({ createdAt: -1 }).exec();

      return { message: 'notes', status: true, notes };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }


  async getNote(
    noteId: string,
  ): Promise<{ message: string; status: boolean; note?: NoteInterface }> {
    try {
        
      const note = await this.noteModel.findOne({ _id:noteId })
      if(note){
          return { message: 'note', status: true, note };
      }else{
        return { message: 'note', status: false };
      }
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }


  async noteUpdate(
    noteData: CreateNoteDto,
  ): Promise<{ message: string; status: boolean; note?: NoteInterface }> {
    try {
        const existingNote = await this.noteModel.findById(noteData._id);

        if (!existingNote) {
          throw new HttpException('Note not found', HttpStatus.NOT_FOUND);
        }

        existingNote.title = noteData.title;
        existingNote.description = noteData.description;
        existingNote.backgroundColor = noteData.backgroundColor;
        existingNote.textColor = noteData.textColor;

        const updatedNote = await existingNote.save();

        return { message: 'Note updated successfully', status: true, note: updatedNote };

    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }



  

  
}
