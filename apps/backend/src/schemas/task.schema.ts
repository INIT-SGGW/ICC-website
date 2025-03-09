import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Semester } from '@repo/types';
import { Types, type HydratedDocument } from 'mongoose';

export type TaskDocument = HydratedDocument<Task>;

@Schema()
export class Content {
  @Prop({ required: true })
  partA: string;

  @Prop({ required: true })
  partB: string;
}

@Schema()
export class UsersFinished {
  @Prop({ type: Array<Types.ObjectId>, ref: 'User', default: [] })
  partA: Types.ObjectId[];

  @Prop({ type: Array<Types.ObjectId>, ref: 'User', default: [] })
  partB: Types.ObjectId[];
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
