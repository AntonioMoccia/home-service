import {EventModel,IEvent} from '@models/events.models'

class Event{
    async create(event:IEvent){
       try {
        const newEvent = await EventModel.create({
            image:event.image,
            city:event.city,
            description:event.description,
            name:event.name,
            type:event.type,
            location:{
                latitude:event.location.latitude,
                longitude:event.location.longitude
            }
        })
        return newEvent
       } catch (error) {
        throw new Error(`qualcosa è andato storto durante la creazione dell\'evento ${event.name}`)
       }
    }
    async getEvents(){
        try {
            const events = await EventModel.find()
            
            return events
        } catch (error) {
            throw new Error(`qualcosa è andato storto durante la ricerca degli eventi`)
        }

    }

}

export default Event