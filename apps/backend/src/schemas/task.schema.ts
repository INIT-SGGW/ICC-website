import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Semester } from '@repo/types';
import type { HydratedDocument } from 'mongoose';
import { Types } from 'mongoose';
import { User } from './user.schema.js';

export type TaskDocument = HydratedDocument<Task>;

@Schema({ _id: false })
export class Content {
  @Prop({ type: String, required: true })
  partA: string;

  @Prop({ type: String, required: true })
  partB: string;
}

@Schema({ _id: false })
export class UserFinishedPart {
  @Prop({ type: Types.ObjectId, required: true, ref: "User" })
  userId: Types.ObjectId;

  @Prop({ type: Date, required: true })
  finishedAt: Date;

  @Prop({ type: Number, required: true })
  points: number;
}

@Schema({ _id: false })
export class UsersFinished {
  @Prop({ type: [UserFinishedPart], default: [] })
  partA: UserFinishedPart[];

  @Prop({ type: [UserFinishedPart], default: [] })
  partB: UserFinishedPart[];
}

@Schema({
  timestamps: true,
  _id: true,
})
export class Task {
  @Prop({ type: String, required: true })
  title: string;

  @Prop({ type: Content, required: true })
  content: Content;

  @Prop({ type: String, required: true })
  filePath: string;

  @Prop({ type: Date, required: true })
  releaseDate: Date;

  @Prop({ type: String, enum: Semester, required: true })
  semester: Semester;

  @Prop({ type: Number, required: true })
  taskNumber: number;

  @Prop({ type: UsersFinished, default: { partA: [], partB: [] } })
  usersFinished: UsersFinished;

  @Prop({ type: Number })
  releaseYear: number;
}

export const TaskSchema = SchemaFactory.createForClass(Task);

//eslint-disable-next-line func-names -- This is a mongoose pre-save hook
TaskSchema.pre<TaskDocument>('save', function (next) {
  const releaseYear = this.releaseDate.getFullYear();
  this.releaseYear = releaseYear;
  next();
});

TaskSchema.set('collection', 'Tasks');
