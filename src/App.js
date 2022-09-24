import React from 'react';
import './App.css';
import MaterialTable from 'material-table'
import PrintIcon from '@material-ui/icons/Print'
import jsPDF from 'jspdf'
import 'jspdf-autotable'
import {CSVLink}  from "react-csv";
//yarn add react-csv {install this for csv}
import XLSX from 'xlsx'
//npm install xlsx

const studentData = [
  {
    id: 1,
    name: "Judith S. Neal",
    email: "Judith@gmail.com",
    Mobile: "(07) 4510 2995",
    DOB: "March 30, 1941",
    Address: "13 Ashton Road SOUTH KUMMININ WA 6368"
  },
  {
    id: 2,
    name: "Kristie E. Sander",
    email: "Kristie25@gmail.com",
    Mobile: "(07) 4577 6214",
    DOB: "June 25, 1985",
    Address: "64 Mandible Street RYAN QLD 4825",
  },

  {
    id: 3,
    name: "Pamela C. White",
    email: "Pamela@gmail.com",
    Mobile: "(03) 9256 1006",
    DOB: "April 7, 1998",
    Address:"40 Boughtman Street STUDFIELD VIC 3152",
  },
  {
    id: 4,
    name: "Carmen M. Hilyard",
    email: "Hilyard@gmail.com",
    Mobile: "(08) 8226 9650",
    DOB: "November 29, 1945",
    Address:"56 Dabinett Road MANNUM SA 5238",
  },
  {
    id: 5,
    name: "Ronald L. Lowery",
    email: "RonaldL@gmail.com",
    Mobile: "(02) 6152 1553",
    DOB: "August 20, 1977",
    Address:"10 Lewin Street FRENCH PARK NSW 2655",
  },
  {
    id: 6,
    name: "Beverly C. Hamilton",
    email: "Beverly@gmail.com",
    Mobile: "405-366-8376",
    DOB: "January 29, 1970",
    Address:"2289 Ottis Street Norman, OK 73069",
  },
  {
    id: 7,
    name: "Herbert D. Faulkner",
    email: "DFaulkner@gmail.com",
    Mobile: "330-657-7845",
    DOB: "June 29, 1974",
    Address:"1167 Wildwood Street Peninsula, OH 44264",
  },
  {
    id: 8,
    name: "Joseph N. Kump",
    email: "Joseph.N@gmail.com",
    Mobile: "309-400-0832",
    DOB: "March 7, 1943",
    Address:"1426 Coburn Hollow Road Peoria, IL 61602",
  },
  {
    id: 9,
    name: "Betty T. Stiffler",
    email: "Betty@gmail.com",
    Mobile: "312-823-8267",
    DOB: "July 3, 1949",
    Address:"2125 Tator Patch Road Chicago, IL 60605",
  },
  {
    id: 10,
    name: "Daniel K. Arp",
    email: "K.Arp@gmail.com",
    Mobile: "918-833-6064",
    DOB: "October 11, 1948",
    Address:"2100 Bridge Street Tulsa, OK 74115",
  }
]
function App() {
  const columns = [
    { title: "Name", field: "name", },
    { title: "Email", field: "email", },
    { title: "Mobile No", field: "Mobile" },
    { title: "DAte OF Birth", field: 'DOB' },
    { title: "Address", field: 'Address' },  
  ]
//PDF Downloading 
  const downloadPdf = () => {
    const doc = new jsPDF()
    doc.text("Student Details", 20, 20)
    doc.autoTable({
      theme: "grid",
      columns: columns.map(col => ({ ...col, dataKey: col.field })),
      body: studentData
    })
    doc.save('table.pdf')
  }


  // we can give custom headers in csv using the kkey values
  const headers = [
    { label: "Name", key: "name" },
    { label: "Email ID", key: "email" },
    { label: "Mobile No", key: "Mobile" },
    { label: "DAte OF Birth", key: "DOB" },
    { label: "Address", key: "Address" },  
  ];
//For downloading in CSV format
  const csvReport = {
    data: studentData,
    headers: headers,
    filename: 'StudentData.csv'
  };

  //For downloading in Excel sheet format
  const downloadExcel = () => {
    const newData = studentData.map(row => {
      delete row.tableData
      return row
    })
    const workSheet = XLSX.utils.json_to_sheet(newData)
    const workBook = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(workBook, workSheet, "students")
    //Buffer
    XLSX.write(workBook, { bookType: "xlsx", type: "buffer" })
    //Binary string
    XLSX.write(workBook, { bookType: "xlsx", type: "binary" })
    //Download
    XLSX.writeFile(workBook, "StudentsData.xlsx")


  }
  return (
    <div className="App">
      <h2 align='center'>Export Data in PDF/CSV/EXCEL format in Material Table</h2>
      <MaterialTable
        title="Student Details"
        columns={columns}
        data={studentData}
        actions={[
          {
            icon: () => <PrintIcon />,// Here you can pass icon too
            tooltip: "Export to Pdf",
            onClick: () => downloadPdf(),
            isFreeAction: true
          },
          {
            icon: () => <button>
            <CSVLink {...csvReport} style={{textDecoration:"none",color:"black"}}>Export as CSV</CSVLink></button>,// Here you can pass icon too
            tooltip: "Export to CSV",
            //onClick: () => downloadCSV(),
            isFreeAction: true
          },
          {
            icon: () => <button>Export as Excel</button>,// Here you can pass icon too
            tooltip: "Export to Excel",
            onClick: () => downloadExcel(),
            isFreeAction: true
          },
        ]}
      />
    </div>
  );
}

export default App;
