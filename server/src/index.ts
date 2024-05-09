import express, { Express } from "express"
import mongoose from "mongoose"
import finacialRecordRouter from "./routes/financial-records"
import cors from "cors";

const app: Express = express();
const port = process.env.PORT || 3001

// 
app.use(express.json())
app.use(cors())

// connect variable to the mongodb database
const mongoURI: string = 'mongodb+srv://nobody:nobody@finance-tracker.zpsvipn.mongodb.net/'

mongoose.connect(mongoURI)
    .then(() => {
        // if connected to the database console the message
        console.log('connected to the mongodb');
    })
    .catch((err) => {
        // if failed to connect to the database console the error message
        console.log('failed to connect to the mongodb: \n', err);
    })

app.use("/financial-records", finacialRecordRouter)

app.listen(port, () => {
    console.log('server running on port : ', port);
})