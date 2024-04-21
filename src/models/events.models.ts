import * as mongoose from "mongoose";

export type GeoLocation = {
  latitude: number;
  longitude: number;
};
export enum EventType {
  PRIVATE = "private",
  PUBLIC = "public",
}

export interface IEvent {
  name: string;
  description: string;
  image:string;
  city: string;
  type: EventType;
  location: GeoLocation;
}


const eventSchema = new mongoose.Schema<IEvent>(
  {
    name: {
      type: mongoose.SchemaTypes.String,
      required: true,
    },
    description: {
      type: mongoose.SchemaTypes.String,
      required: true,
    },
    image:{
      type:mongoose.SchemaTypes.String
    },
    city: {
      type: mongoose.SchemaTypes.String,
      required: true,
    },
    type:{
        type: mongoose.SchemaTypes.String,
        required: true,
    },
    location:{
        type: mongoose.SchemaTypes.Mixed,
        required: true,
    }
  },
  {
    timestamps: true,
  }
);

export const EventModel = mongoose.model<IEvent>("Event", eventSchema);
