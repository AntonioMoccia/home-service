import mongoose from "mongoose";
import { UserModel } from "@models/users.model";
import { Models } from "@types";

const models = {
    UserModel
}

class MongoDb {
  constructor() {
    this.init();
  }
   init(){
    return new Promise((resolve,reject)=>{
      mongoose.connect("mongodb://localhost:27017/"
        , {
        dbName: "events",
        auth: {
          username: "root",
          password: "admin",
        },
      }).then(()=>{
        resolve('db connected')
      }).catch(e=>{
        reject('qualcosa è andato storto')
      })
    })
  }
  
}

export default MongoDb;
