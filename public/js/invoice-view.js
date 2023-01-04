const urlParams = new URLSearchParams(window.location.search);

const invoiceTo = urlParams.get("invoiceTo");
const invoiceToJson = JSON.parse(invoiceTo);

console.log(invoiceToJson);
console.log(invoiceToJson.toData);
console.log(invoiceToJson.dataItems);

document.getElementById("date").innerHTML =
  "DATE: " + invoiceToJson.toData.date;
document.getElementById("toName").innerHTML = invoiceToJson.toData.toName;
document.getElementById("address").innerHTML = invoiceToJson.toData.address;
document.getElementById("contact").innerHTML = invoiceToJson.toData.contact;

let tableRow = document.getElementById("tableBody");

invoiceToJson.dataItems.forEach((element, index) => {
  const priceNum = +element.price;
  const qty = +element.quantity;
  const amount = new Intl.NumberFormat().format(priceNum * qty.toFixed(2));

  tableRow.innerHTML += `
    <tr>
        <td>
            <div class="item-desc-1">
                <span>${index + 1}</span>
            </div>
        </td>
        <td class="pl0">${element.description}</td>
        <td class="text-center">${element.price}</td>
        <td class="text-center">${element.quantity}</td>
        <td class="text-end">${amount}</td>
    </tr>
    `;
});

const subTotal = invoiceToJson.toData.subTotal;
const addTax = (subTotal * 0.18).toFixed(2);

const grandTotal = +addTax + subTotal;
document.getElementById("subTotal").innerHTML = new Intl.NumberFormat().format(
  subTotal.toFixed(2)
);
document.getElementById("tax").innerHTML = new Intl.NumberFormat().format(
  addTax
);
document.getElementById("grand-total").innerHTML =
  new Intl.NumberFormat().format(grandTotal.toFixed(2));
