import express, { Request, Response } from "express"
import FinancialRecordModel from "../schema/financial-record"

const router = express.Router()

// get records by the userId i.e with the logged in userId as per the session userId
router.get("/getAllByUserId/:userId", async (req: Request, res: Response) => {
    try {
        // get the userId from the frontend as the parameters
        const userId = req.params.userId;

        // get all the records as per the userId passed in the arguments
        const records = await FinancialRecordModel.find({ userId: userId })

        if (records.length === 0) {
            res.status(404).json({
                message: 'Records not found for the user.'
            })
        }
        res.status(200).send(records)
    } catch (error) {
        console.log('Error in api route');
        res.status(500).json({
            message: 'Error in api route',
            error
        })
    }
})

// add a new record for the logged in user as per the session userId
router.post("/", async (req: Request, res: Response) => {
    try {
        // get the user data from the frontend using req.body
        const newRecordBody = req.body;

        // save the data fetched as new FinancialRecordModel in the FinancialRecordModel
        const newRecord = new FinancialRecordModel(newRecordBody)

        // save the record in the database
        const savedRecord = await newRecord.save()

        if (!savedRecord) return res.status(404).json({
            message: 'record not saved in the database'
        })
        return res.status(201).send(savedRecord)
    } catch (error) {
        console.log('error in the api route');
        res.status(500).json({
            message: 'error in the api route',
            error
        })
    }
})

router.put("/:id", async (req: Request, res: Response) => {
    try {
        const id = req.params.id

        const newRecordBody = req.body

        const record = await FinancialRecordModel.findByIdAndUpdate(id, newRecordBody, { new: true })

        if (!record) return res.status(404).json({
            message: 'record not updated'
        })
        return res.status(200).send(record)
    } catch (error) {
        console.log('error in the api route');
        res.status(500).json({
            message: 'error in the api route',
            error
        })
    }
})

// delete the record
router.delete("/:id", async (req: Request, res: Response) => {
    try {
        const id = req.params.id;

        const record = await FinancialRecordModel.findByIdAndDelete(id);

        if (!record) return res.status(404).json({
            message: 'data not deleted'
        })
        return res.status(200).send(record)
    } catch (error) {
        console.log('error in the api route');
        res.status(500).json({
            message: 'error in the api route',
            error
        })
    }
})

export default router;