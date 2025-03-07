import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type TaskSchema = HydratedDocument<Task>;

@Schema()
export class Task {
    @Prop({ required: true })
    name: string;

    @Prop({ required: true, unique: true })
    email: string;

    @Prop({ default: Date.now })
    createdAt: Date;
}

export const TaskSchema = SchemaFactory.createForClass(Task);
