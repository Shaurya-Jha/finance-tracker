import React, { useState } from 'react'
import { Input, Button, Select } from '@chakra-ui/react'
import { useUser } from '@clerk/clerk-react'

function FinancialRecordForm() {

    const {user} = useUser()

    const [description, setDescription] = useState<string>('')
    const [amount, setAmount] = useState<string>('')
    const [category, setCategory] = useState<string>('')
    const [paymentMethod, setPaymentMethod] = useState<string>('')

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const newRecord = {
            userId: user?.id,
            date: new Date(),
            description: description,
            amount: parseFloat(amount),
            category: category,
            paymentMethod: paymentMethod,
        }

        // addRecord(newRecord)

        // clear the state of the fields
        setDescription("");
        setAmount("");
        setCategory("");
        setPaymentMethod("");
    }

  return (
    <div>
        <form className='flex flex-col gap-4 m-2 items-center' onSubmit={handleSubmit}>
            {/* description */}
            <Input type='text' required placeholder='Add description...' />

            {/* amount */}
            <Input type='number' required placeholder='Add amount...' />

            {/* select category */}
            <Select required placeholder='Select category'>
                <option value={'Food'}>Food</option>
                <option value={'Rent'}>Rent</option>
                <option value={'Salary'}>Salary</option>
                <option value={'Utilities'}>Utilities</option>
                <option value={'Entertainment'}>Entertainment</option>
                <option value={'Other'}>Other</option>
            </Select>

            {/* payment method */}
            <Select required placeholder='Select payment method'>
                <option value={'Credit card'}>Credit Card</option>
                <option value={'Cash'}>Cash</option>
                <option value={'Bank transfer'}>Bank Transfer</option>
            </Select>

            {/* submit btn */}
            <Button type='submit' bgColor={'red.500'} color={'white'}>Add record</Button>
        </form>
    </div>
  )
}

export default FinancialRecordForm