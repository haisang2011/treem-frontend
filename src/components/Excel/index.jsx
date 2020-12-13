import React from 'react'
import { Button } from '@material-ui/core';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';

const csvData = [
    {
        name: "Hai Sang",
        age: 22
    },
    {
        name: "Van Thanh",
        age: 20
    },
    {
        name: "Si Liem",
        age: 21
    },
]

const fileName = "sheet-01";

function ExportCSV(){

    const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    const fileExtension = '.xlsx';

    const exportToCSV = (csvData, fileName) => {
        const ws = XLSX.utils.json_to_sheet(csvData);
        const wb = { Sheets: { 'data': ws }, SheetNames: ['data'] };
        const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
        const data = new Blob([excelBuffer], {type: fileType});
        FileSaver.saveAs(data, fileName + fileExtension);
    }

    return (
        <Button variant="warning" onClick={(e) => exportToCSV(csvData,fileName)}>Export</Button>
    )
}

export default ExportCSV