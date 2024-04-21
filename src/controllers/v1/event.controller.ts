import { Request, Response } from "express";
import EventService from "@services/v1/event.service";

const eventService = new EventService();

export const eventController = {
  createEvent: async (req: Request, res: Response) => {
    const event = req.body;
    try {
      const newEvent = await eventService.create({
        image:event.image,
        city: event.city,
        description: event.description,
        name: event.name,
        type: event.type,
        location: {
          latitude: event.location.latitude,
          longitude: event.location.longitude,
        },
      });
      res.json(newEvent);
    } catch (error) {
      res.status(500).send("Qualcosa è andato storto");
    }
  },
  getEvents:async (req:Request,res:Response)=>{
    try {
      const events = await eventService.getEvents()
      res.json(events)
    } catch (error) {
      res.status(500).send("Qualcosa è andato storto");
    }
  }
};
