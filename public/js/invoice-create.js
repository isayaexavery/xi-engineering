const date = document.querySelector("#date");
const toName = document.querySelector("#name");
const address = document.querySelector("#address");
const contact = document.querySelector("#contact");

const description = document.querySelector(".item-description");
const quantity = document.querySelector("#quantity");
const price = document.querySelector("#price");

const submitBtn = document.querySelector(".submit_item");

submitBtn.addEventListener("click", () => {
  const data = {
    description: description.value,
    price: price.value,
    quantity: quantity.value,
  };
  newElement(data);
});

let tableRow = document.getElementById("tableBody");

const itemsArray = [];
const dataArray = [];
let subTotal = 0;
function newElement(items) {
  // let inputValue = document.getElementById("myInput").value;
  // var li = document.createElement("li");
  dataArray.push(items);
  const priceNum = +items.price;
  const qty = +items.quantity;

  itemsArray.push(priceNum * qty);

  subTotal = itemsArray.reduce((acc, value) => {
    return acc + value;
  }, 0);

  const amount = new Intl.NumberFormat().format(priceNum * qty.toFixed(2));

  tableRow.innerHTML += `
    <tr>
        <td>
            <div class="item-desc-1">
                <span>${dataArray.length}</span>
            </div>
        </td>
        <td class="pl0">${items.description}</td>
        <td class="text-center">${items.price}</td>
        <td class="text-center">${items.quantity}</td>
        <td class="text-end">${amount}</td>
    </tr>
    `;

  const addTax = (subTotal * 0.18).toFixed(2);
  const grandTotal = +addTax + subTotal;
  document.getElementById("subTotal").innerHTML =
    new Intl.NumberFormat().format(subTotal.toFixed(2));
  document.getElementById("tax").innerHTML = new Intl.NumberFormat().format(
    addTax
  );
  document.getElementById("grand-total").innerHTML =
    new Intl.NumberFormat().format(grandTotal.toFixed(2));

  console.log("====================================");
  console.log(itemsArray);
  console.log("====================================");
}

document.getElementById("view-btn").addEventListener("click", () => {
  const invoiceTo = {
    toData: {
      date: date.value,
      toName: toName.value,
      address: address.value,
      contact: contact.value,
      subTotal: subTotal,
    },
    dataItems: dataArray,
  };

  location.replace(`/invoice-view.html?invoiceTo=${JSON.stringify(invoiceTo)}`);
});
