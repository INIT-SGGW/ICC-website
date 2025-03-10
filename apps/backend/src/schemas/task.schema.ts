import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Semester } from '@repo/types';
import type { HydratedDocument } from 'mongoose';
import { Types } from 'mongoose';
import { User } from './user.schema.js';

export type TaskDocument = HydratedDocument<Task>;

@Schema({ _id: false })
export class Content {
  @Prop({ required: true })
  partA: string;

  @Prop({ required: true })
  partB: string;
}

@Schema({ _id: false })
export class UserFinishedPart {
  @Prop({ required: true, type: Types.ObjectId, ref: User.name })
  userId: User;

  @Prop({ required: true, type: Date })
  finishedAt: Date;

  @Prop({ required: true, type: Number })
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
  @Prop({ required: true, type: String })
  title: string;

  @Prop({ required: true, type: Content })
  content: Content;

  @Prop({ required: true, type: String })
  filePath: string;

  @Prop({ required: true, type: Date })
  releaseDate: Date;

  @Prop({ required: true, enum: Semester })
  semester: Semester;

  @Prop({ required: true, type: Number })
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
