const ExcelJS = require('exceljs');

async function readExcel(filePath, sheetName) {
  const workbook = new ExcelJS.Workbook();
  await workbook.xlsx.readFile(filePath);
  const worksheet = workbook.getWorksheet(sheetName);

  const rows = [];
  const headers = [];

  worksheet.getRow(1).eachCell((cell, colNumber) => {
    headers[colNumber] = cell.value;
  });

  worksheet.eachRow((row, rowNumber) => {
    if (rowNumber === 1) return; // skip header
    const rowData = {};
    row.eachCell((cell, colNumber) => {
      rowData[headers[colNumber]] = cell.value;
    });
    rows.push(rowData);
  });

  return rows;
}

module.exports = { readExcel };
