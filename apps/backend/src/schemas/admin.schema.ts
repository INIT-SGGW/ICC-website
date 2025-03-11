import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { type HydratedDocument, Types } from 'mongoose';

export type AdminDocument = HydratedDocument<Admin>;

@Schema({ _id: true })
export class Admin {
  @Prop({ type: Types.ObjectId })
  _id: Types.ObjectId;

  @Prop()
  first_name: string;

  @Prop()
  last_name: string;

  @Prop()
  email: string;
}

export const AdminSchema = SchemaFactory.createForClass(Admin);

AdminSchema.set('collection', 'Admins');
