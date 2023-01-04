const token = JSON.parse(localStorage.getItem("xiToken"));

if (token) {
  let base64Url = token.xiToken.split(".")[1];
  let base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  let jsonPayload = decodeURIComponent(
    atob(base64)
      .split("")
      .map(function (c) {
        return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join("")
  );

  if (JSON.parse(jsonPayload).email === token.email) {
  } else {
    location.replace("/login");
  }
} else {
  location.replace("/login");
}

let tableRow = document.getElementById("tableBody");

fetch("/get-expenses", {
  method: "get",
  headers: new Headers({ "Content-Type": "application/json" }),
})
  .then((res) => res.json())
  .then((response) => {
    console.log(response);
    response.forEach((element, index) => {
      const formattedAmount = new Intl.NumberFormat().format(element.amount);
      tableRow.innerHTML += `<tr class="tr">
      <td>
          <div class="item-desc-1">
              <span>${index + 1}</span>
    
          </div>
      </td>
      <td class="pl0">${element.expenseType}</td>
    
      <td class="text-end">${formattedAmount}</td>
    </tr>`;
    });
  });

function newElement() {
  let inputValue = document.getElementById("myInput").value;
  // var li = document.createElement("li");

  tableRow.innerHTML += `<tr class="tr">
  <td>
      <div class="item-desc-1">
          <span>02</span>

      </div>
  </td>
  <td class="pl0">${inputValue}</td>

  <td class="text-end">0</td>
</tr>`;
  fetch("/add-expense-type", {
    method: "post",
    headers: new Headers({ "Content-Type": "application/json" }),
    body: JSON.stringify({ expenseType: inputValue }),
  })
    .then((res) => res.json())
    .then((response) => {
      location.replace("/expenses-types");
    });
}
