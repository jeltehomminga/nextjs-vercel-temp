import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { timeRecords, fakeData } from './../fakeData'
import React, { useState } from 'react'
import styled from '@emotion/styled'
import { useTable, usePagination } from 'react-table'
import { v4 as uuidv4 } from 'uuid'

const StyledTable = styled.table`
  border-spacing: 0;
  border: 1px solid black;
  width: 500px;

  tr {
    :last-child {
      td {
        border-bottom: 0;
      }
    }
  }

  th,
  td {
    margin: 0;
    padding: 0.2rem;
    border-bottom: 1px solid black;
    border-right: 1px solid black;

    :last-child {
      border-right: 0;
    }
  }
`

const Input = styled.input({
  fontSize: '1rem',
  padding: 0,
  margin: 0,
  border: 0,
})

// Create an editable cell renderer
const EditableCell = ({
  value: initialValue = '',
  row: { index },
  column: { id },
  updateMyData,
}) => {
  const [value, setValue] = useState(initialValue)
  const onChange = (e) => setValue(e.target.value)
  const onBlur = () => updateMyData(index, id, value)

  React.useEffect(() => {
    setValue(initialValue)
  }, [initialValue])

  return <Input value={value} onChange={onChange} onBlur={onBlur} />
}

// Set our editable cell renderer as the default Cell renderer
const defaultColumn = {
  Cell: EditableCell,
}

// Be sure to pass our updateMyData option
function Table({ columns, data, updateMyData, deleteRow }) {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
  } = useTable(
    {
      columns,
      data,
      defaultColumn,
      updateMyData,
      deleteRow,
    },
    usePagination
  )

  // Render the UI for your table
  return (
    <>
      <StyledTable {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()}>{column.render('Header')}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row, i) => {
            prepareRow(row)
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                })}
              </tr>
            )
          })}
        </tbody>
      </StyledTable>
    </>
  )
}

export default function Home() {
  const columns = React.useMemo(
    () => [
      {
        Header: 'project',
        accessor: 'project',
      },
      {
        Header: 'monday',
        accessor: 'monday',
      },
      {
        Header: 'tuesday',
        accessor: 'tuesday',
      },
      {
        Header: 'wednesday',
        accessor: 'wednesday',
      },
      {
        Header: 'thursday',
        accessor: 'thursday',
      },
      {
        Header: 'friday',
        accessor: 'friday',
      },
      {
        Header: 'remove',
        accessor: (str) => 'remove',
        Cell: ({ row, deleteRow }) => (
          <div
            onClick={() => {
              deleteRow(row.original.id)
            }}
          >
            ❌
          </div>
        ),
      },
    ],

    []
  )
  const [data, setData] = useState(fakeData)

  // console.log('fakeData', JSON.stringify(fakeData, null, 2))

  const updateMyData = (rowIndex, columnId, value) => {
    setData((old) =>
      old.map((row, index) => {
        if (index === rowIndex) {
          return {
            ...old[rowIndex],
            [columnId]: value,
          }
        }

        return row
      })
    )
  }

  const addRow = () =>
    setData((data) => [
      ...data,
      {
        id: uuidv4(),
      },
    ])

  const deleteRow = (id) =>
    setData((data) => data.filter((row) => row.id !== id))

  return (
    <div className={styles.container}>
      <Head>
        <title>Next Hours App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Table
        columns={columns}
        data={data}
        updateMyData={updateMyData}
        deleteRow={deleteRow}
      />
      <button onClick={() => addRow()}>Add row</button>
      {/* </main> */}
    </div>
  )
}
