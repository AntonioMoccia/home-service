import * as mongoose from "mongoose"

const db = mongoose.connect('mongodb://localhost:27017/', {
    dbName: 'events',
    auth: {
        username: 'root',
        password: 'admin',
    }
});

export default db
