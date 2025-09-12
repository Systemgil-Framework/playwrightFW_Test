const fs = require('fs');
const path = require('path');
const ExcelUtils = require('./ExcelUtils');

function normalizeValue(value) {
  if (value === null || value === undefined) return '';
  if (typeof value === 'object') {
    if ('text' in value) return value.text;
    if ('richText' in value) return value.richText.map(t => t.text).join('');
    if ('hyperlink' in value) return value.hyperlink.replace(/^mailto:/, '');
    return JSON.stringify(value);
  }
  return String(value);
}

async function globalSetup() {
  console.log('📊 Loading Excel test data...');
  const data = await ExcelUtils.readExcel('./testData/data.xlsx', 'Users');

  const normalized = data.map(row => {
    const fixedRow = {};
    for (const key in row) {
      if (Object.hasOwn(row, key)) {
        fixedRow[key] = normalizeValue(row[key]);
      }
    }
    return fixedRow;
  });

  fs.writeFileSync(
    path.join(__dirname, '../tempTestData.json'),
    JSON.stringify(normalized, null, 2)
  );
  console.log('✅ Excel test data saved to tempTestData.json');
}

module.exports = globalSetup;
