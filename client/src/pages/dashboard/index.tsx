import React from 'react'
import { Text, Heading } from '@chakra-ui/react'
import { useUser } from '@clerk/clerk-react'
import FinancialRecordForm from './financial-record-form'
import FinancialRecordList from './financial-record-list'

function Dashboard() {

    // clerk useUser initialization
    const { user } = useUser()

    return (
        <div>

            <div className='flex justify-center items-center w-full'>
                <Heading as={"h3"}>Welcome {user?.firstName} {user?.lastName} ! Here are your Finances</Heading>
            </div>

            <div className='grid grid-cols-2'>
                {/* financial record form */}
                <div className='bg-white'>
                    <div className='m-1 rounded-lg bg-gray-200 min-h-screen py-4'>
                        <FinancialRecordForm />
                    </div>
                </div>

                {/* financial record list */}
                <div className='bg-white'>
                    <div className='m-1 rounded-lg bg-gray-200 min-h-screen py-4'>
                        <FinancialRecordList />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dashboard