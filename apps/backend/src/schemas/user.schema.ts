import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { type HydratedDocument, Types } from 'mongoose';
import { Task } from './task.schema.js';

export type UserDocument = HydratedDocument<User>;
@Schema()
export class PreviousAnswers {
  @Prop({ required: true })
  answer: string;

  @Prop({ required: true, default: Date.now })
  date: Date;
}

@Schema()
export class Part {
  @Prop()
  previous_answers: PreviousAnswers[];

  @Prop({ required: true })
  correct_answer: string;

  @Prop({ default: 0 })
  cooldown: number;

  @Prop({ default: 0 })
  points: number;

  @Prop({ default: false })
  is_correct: boolean;
}

@Schema({ _id: false })
export class Answers {
  @Prop({ required: true, type: Types.ObjectId, ref: 'Task' })
  task_id: Types.ObjectId;

  @Prop({ required: true, type: String })
  input_path: string;

  @Prop({ required: true, type: String })
  seed: string;

  @Prop({ required: true })
  partA: Part;

  @Prop({ required: true })
  partB: Part;
}

@Schema()
export class User {
  @Prop({ required: true })
  first_name: string;

  @Prop()
  last_name: string;

  @Prop()
  emails: string[];

  @Prop({ default: [] })
  started_tasks: Answers[];

  @Prop({ default: 0 })
  pointsGeneral: number;

  @Prop()
  student_index: number;
}

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.set('collection', 'Users');
