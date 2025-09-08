 
import { MongoClient } from "mongodb";
const client = new MongoClient(process.env.MONGOSTRING);
client.connect();
let db = client.db("easybitsportfolio");
export default db;