const fs = require('fs');
const { formatDistance, subDays } = require('date-fns');
//const vnLocale = require('date-fns/locale/vi-vn');

const readData = (callback) => {
  fs.readFile('products.json', 'utf8', (err, data) => {
    if (err) throw new Error('Somethings bad happened!');
    const dataProducts = JSON.parse(data.toString());
    callback(dataProducts);
  });
};
const countProducts = (products) => {
  let count = 0;
  products.forEach(element => {
    count++;
  });
  return count;
};

const convertDate = (products) => {
  let newDate;
  products.forEach(element => {
    newDate = new Date(element.dateUpdated);
    element.dateUpdated = newDate.toGMTString();
  });
};

const formatPrice = (products) => {
  let price;
  products.forEach(element => {
    price = element.price.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
    element.price = price;
  });
};

// const printProduct = (products) => {
//   let fromNow;
//   const option = {
//     locale:vnLocale
//   };
//   products.forEach(element => {
//     fromNow = formatDistance(new Date(), element.dateUpdated, option);
//     console.log(fromNow);
//   });
// };

const processingWork = (products) => {
  console.log(countProducts(products));
  convertDate(products);
  formatPrice(products);
  printProduct(products);
  //console.log(products);
};
readData(processingWork);
