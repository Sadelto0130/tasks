import {connect, connection} from "mongoose";

const conn = {
  isConnected: false
}

export async function connectDB() {
  if(conn.isConnected) return;

  const db = await connect('mongodb+srv://sadelto3011:l0j0pJPghV72gyQc@tasks.w0oudba.mongodb.net/')
  console.log(db.connection.db.databaseName)
  conn.isConnected = db.connections[0].readyState
}

connection.on('connected', () =>{
  console.log('Mongoose is connected')
})

connection.on('error', (err) => {
  console.log('Mongoose conection error', err)
})