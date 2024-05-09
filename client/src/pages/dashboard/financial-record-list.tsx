import React from 'react'
import { useFinancialRecords } from '../../context/financial-record-context'
import { Table, Thead, Tbody, Tr, Th, Td, TableCaption, TableContainer, Button } from '@chakra-ui/react'

function FinancialRecordList() {

  const {records, deleteRecord, updateRecord} = useFinancialRecords()

  const deleteRecordFromTable = (id:string) => {
    deleteRecord(id)
  }

  return (
    <div className='table-container'>
      {/* {records.map((record, key) => (
        <div key={key}>
          <p>{record?.description}</p>
        </div>
      ))} */}

      <TableContainer>
        <Table variant={"striped"}>
          <TableCaption>Financial Record List</TableCaption>

          <Thead>
            <Tr>
              <Th>Sr.no</Th>
              <Th>Description</Th>
              <Th>Amount</Th>
              <Th>Category</Th>
              <Th>Payment Method</Th>
              <Th colSpan={2}>
                <Td>Options</Td>
              </Th>
            </Tr>
          </Thead>

          <Tbody>
            {records.map((record, key: number) => (
              <Tr key={key}>
                <Td>{key + 1}</Td>
                <Td>{record?.description}</Td>
                <Td>{record?.amount}</Td>
                <Td>{record?.category}</Td>
                <Td>{record?.paymentMethod}</Td>
                <Td>
                  <Button bgColor={"red"} color={"white"} onClick={() => deleteRecordFromTable(record?.id)}>Delete</Button>
                </Td>
                <Td>
                  <Button bgColor={"yellow.400"} color={"white"}>Edit</Button>
                </Td>
              </Tr>
            ))}
            <Tr></Tr>
          </Tbody>
        </Table>
      </TableContainer>
    </div>
  )
}

export default FinancialRecordList