let order = [
  { itemName: "Hot Cakes", quantity: 1, unitPricePence: 232 },
  { itemName: "Apple Pie", quantity: 2, unitPricePence: 139 },
  { itemName: "Egg McMuffin", quantity: 1, unitPricePence: 280 },
  { itemName: "Sausage McMuffin", quantity: 1, unitPricePence: 300 },
  { itemName: "Hot Coffee", quantity: 2, unitPricePence: 100 },
  { itemName: "Hash Brown", quantity: 4, unitPricePence: 40 },
];
console.log("QTY     ITEM                TOTAL");

let grandTotal = 0;

order.forEach((item) => {
  const { itemName, quantity, unitPricePence } = item;

  const totalPrice = (unitPricePence * quantity) / 100;

  grandTotal += totalPrice;

  console.log(
    `${String(quantity).padEnd(8, " ")}${itemName.padEnd(18, " ")}${totalPrice.toFixed(2).padStart(6, " ")}`
  );
});

console.log(`\nTotal: ${grandTotal.toFixed(2)}`);
