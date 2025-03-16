import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { type HydratedDocument, Types } from 'mongoose';
import { Degree, Faculty } from '@repo/types';

export type UserDocument = HydratedDocument<User>;
@Schema({ _id: false })
export class PreviousAnswers {
  @Prop({ type: String, required: true })
  answer: string;

  @Prop({ type: Date, required: true, default: Date.now })
  date: Date;
}

@Schema({ _id: false })
export class Part {
  @Prop({ type: [PreviousAnswers], default: [] })
  previous_answers: PreviousAnswers[];

  @Prop({ type: String, required: true })
  correct_answer: string;

  @Prop({ type: Date, default: null })
  cooldown: Date | null;

  //number of cooldowns
  @Prop({ type: Number, default: 0 })
  cooldowns_counter: number;

  @Prop({ type: Number, default: 0 })
  points: number;

  @Prop({ type: Boolean, default: false })
  is_correct: boolean;
}

@Schema({ _id: false })
export class StartedTasks {
  @Prop({ type: Types.ObjectId, required: true, ref: 'Task' })
  task_id: Types.ObjectId;

  @Prop({ type: String, required: true })
  input_path: string;

  @Prop({ type: String, required: true })
  seed: string;

  @Prop({ type: Part, required: true })
  partA: Part;

  @Prop({ type: Part, required: true })
  partB: Part;
}

@Schema()
export class User {
  @Prop({ type: String })
  first_name: string;

  @Prop({ type: String })
  last_name: string;

  @Prop({ type: [String] })
  emails: string[];

  @Prop({ type: [StartedTasks], default: [] })
  started_tasks: StartedTasks[];

  @Prop({ type: Number, default: 0 })
  pointsGeneral: number;

  @Prop({ type: Number })
  student_index: number;

  @Prop({ type: String, enum: Faculty })
  faculity: Faculty;

  @Prop({ type: Number })
  academic_year: number;

  @Prop({ type: String, enum: Degree })
  degree: Degree;
}

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.set('collection', 'Users');
