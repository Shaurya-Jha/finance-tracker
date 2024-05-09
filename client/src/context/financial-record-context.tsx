import { useUser } from "@clerk/clerk-react";
import React, { createContext, useContext, useEffect, useState } from "react";

interface FinancialRecord {
    id?: string;
    userId: string;
    date: Date;
    description: string;
    amount: number;
    category: string;
    paymentMethod: string;
}

interface FinancialRecordsContextType {
    records: FinancialRecord[];
    addRecord: (record: FinancialRecord) => void;
    updateRecord: (id: string, newRecord: FinancialRecord) => void;
    deleteRecord: (id: string) => void
}

export const FinancialRecordsContext = createContext<FinancialRecordsContextType | undefined>(undefined)

export const FinancialRecordsProvider = ({ children }: { children: React.ReactNode }) => {

    const [records, setRecords] = useState<FinancialRecord[]>([])

    const { user } = useUser()

    const fetchRecords = async () => {

        if (!user) return;

        const response = await fetch("http://localhost:3001/financial-records/getAllByUserId/" + user?.id ?? "")

        if (response.ok) {
            console.log("Records fetched for the user: \t" + user?.firstName)

            const records = await response.json()
            console.log("Records fetched are:\t", records)

            setRecords(records)
        } else {
            console.log("Cannot fetch records for the user:\t" + user?.firstName)
        }
    }

    // fetch records on page render
    useEffect(() => {
        fetchRecords()
    }, [user])

    const addRecord = async (record: FinancialRecord) => {
        const response = await fetch("http://localhost:3001/financial-records/", {
            method: "POST",
            body: JSON.stringify(record),
            headers: {
                "Content-Type": "application/json"
            }
        })

        try {
            if (response.ok) {
                const newRecord = await response.json();
                setRecords((prev) => [...prev, newRecord])
            }
        } catch (err) {
            console.log('error in the addRecord context\n', err);
        }

    }

    const deleteRecord = async (id: string) => {
        const response = await fetch("http://localhost:3001/financial-records/" + id, {
            method: "DELETE",
            body: JSON.stringify(id),
            headers: {
                "Content-Type": "application/json"
            }
        })

        if (response.ok) {
            console.log("Record deleted")
        }
    }

    const updateRecord = async (id: string, newRecord: FinancialRecord) => {
        if (!user) return;
        const response = await fetch("http://localhost:3001/financial-records/" + user?.id, {
            method: "PUT",
            body: JSON.stringify(newRecord),
            headers: {
                "Content-Type": "application/json"
            }
        })

        try {
            if (response.ok) {
                const newRecord = await response.json()
                setRecords((prev) => prev.map((record) => {
                    if (record?.id === id) {
                        return newRecord
                    } else {
                        return record
                    }
                }))
            }
        } catch (error) {
            console.log("error in the update record context:\t" + error)
        }
    }

    return (
        <FinancialRecordsContext.Provider value={{ records, addRecord, deleteRecord, updateRecord }}>
            {children}
        </FinancialRecordsContext.Provider>
    )
}

export const useFinancialRecords = () => {
    const context = useContext<FinancialRecordsContextType | undefined>(FinancialRecordsContext)

    if (!context) {
        throw new Error("useFinancialRecords must be used within a FinancialRecordsProvider")
    }

    return context
}