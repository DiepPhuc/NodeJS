const fs = require('fs');
const format = require('date-fns/format');
const XLSX = require('xlsx');

const readData = () => {
  fs.readFile('products1.json', 'utf8', (err, data) => {
    if (err) throw new Error('Somethings bad happened!');
    const dataProducts = JSON.parse(data.toString());
    storeExcelData(dataProducts);
});
};

const updatedDataJSON = (products) => {
  fs.writeFileSync('products.json', JSON.stringify(products));
};

const convertJsonToExcel = (products) => {
  const ws = XLSX.utils.json_to_sheet(products);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'Products');
  XLSX.writeFile(wb, 'products.xlsx');
};

const storeExcelData = (products) => {
  let updated;
  products.forEach(element => {
    // Create new field updated from dateUpdated with following format: MM/DD/YYYY
    updated = format(new Date(element.dateUpdated), 'MM/dd/yyyy');
    // Delete dateUpdated field
    delete element.dateUpdated;
    element.updated = updated.toString();
  });
  updatedDataJSON(products);
  convertJsonToExcel(products);
};
readData();
