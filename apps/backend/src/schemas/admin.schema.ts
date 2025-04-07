import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { type HydratedDocument, Types } from 'mongoose';

export type AdminDocument = HydratedDocument<Admin>;

@Schema({ _id: true })
export class Admin {
  @Prop({ type: Types.ObjectId })
  _id: Types.ObjectId;

  @Prop({ type: String })
  first_name: string;

  @Prop({ type: String })
  last_name: string;

  @Prop({ type: String })
  discord_username: string;

  @Prop({ type: String, unique: true })
  email: string;
}

export const AdminSchema = SchemaFactory.createForClass(Admin);

AdminSchema.set('collection', 'Admins');
