let openBalance = 0;
// let startDate = "";
// let endDate = ""

let modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("model_btn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal
btn.onclick = function () {
  modal.style.display = "block";
};

// When the user clicks on <span> (x), close the modal
span.onclick = function () {
  modal.style.display = "none";
};

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};

const logOut = document.querySelector(".logout");

logOut.addEventListener("click", () => {
  fetch("/logout", {
    method: "get",
    headers: new Headers({ "Content-Type": "application/json" }),
  })
    .then((res) => res.json())
    .then((response) => {
      localStorage.setItem("xiToken", null);
    });
});

let submitBtn = document.querySelector(".submit_btn");

submitBtn.addEventListener("click", () => {
  const date = document.getElementById("date").value;
  const transaction = document.getElementById("transaction").value;
  const description = document.querySelector(".description").value;
  const expenseType = document.getElementById("expense").value;
  const reference = document.querySelector(".reference").value;
  let amount = document.getElementById("amount").value;
  if (transaction == "select") {
    return alert("Please Select transaction");
  }
  if (expenseType == "select") {
    return alert("Please Select Expense");
  }

  const data = {
    date,
    transaction,
    description,
    expenseType,
    reference,
    amount: +amount,
  };
  fetch("/add-accounts", {
    method: "post",
    headers: new Headers({ "Content-Type": "application/json" }),
    body: JSON.stringify(data),
  })
    .then((res) => res.json())
    .then((response) => {
      location.replace("/accounts");
    });

  modal.style.display = "none";
});

const getExpenses = () => {
  const expense = document.getElementById("expense");

  fetch("/get-expenses", {
    method: "get",
    headers: new Headers({ "Content-Type": "application/json" }),
  })
    .then((res) => res.json())
    .then((response) => {
      // let selectList = document.createElement("select");

      response.forEach((element) => {
        const optionElement = document.createElement("option");
        optionElement.value = element.expenseType;
        optionElement.text = element.expenseType;
        expense.appendChild(optionElement);
      });
    });
};

getExpenses();

let tableRow = document.getElementById("tableBody");

const getAccounts = () => {
  const expense = document.getElementById("expense");
  let accountsSummary = document.getElementById("accounts-summary");

  let startEnd = document.getElementById("start-end");
  let receipts = 0;

  let payments = 0;

  fetch("/get-open-balance", {
    method: "get",
    headers: new Headers({ "Content-Type": "application/json" }),
  })
    .then((res) => res.json())
    .then((response) => {
      openBalance = response[response.length - 1].openBalance;
      // startDate = response[0].startDate;
      // endDate = response[0].endDate;
      startEnd.innerHTML = `<p class="invo-addr-1" >       
      Start Date: ${response[response.length - 1].startDate} <br/>
      End Date: ${
        response[response.length - 1].endDate
      } <br/>                                 
      </p>
      `;
    });

  fetch("/get-accounts", {
    method: "post",
    headers: new Headers({ "Content-Type": "application/json" }),
    body: JSON.stringify({ token: token }),
  })
    .then((res) => res.json())
    .then((response) => {
      // console.log(response);
      response.forEach((element) => {
        if (element.transaction == "receipts") {
          receipts = receipts + element.amount;
        }

        if (element.transaction == "payments") {
          payments = payments + element.amount;
        }

        const formattedAmount = new Intl.NumberFormat().format(element.amount);
        tableRow.innerHTML += `
          <tr>
          <td>
              <div class="item-desc-1">
                  <span>${element.date}</span>
              </div>
          </td>
          <td class="pl0">${element.transaction}</td>
          <td class="text-start">${element.description}</td>
          <td class="text-start">${element.expenseType}</td>
          <td class="text-start">${element.reference}</td>
          <td class="text-end">${formattedAmount}</td>
		  
         <td class="text-start">  <a href="#" onClick="deleteItem('${element._id}')">Delete</a></td>
      </tr>
          `;
      });
      accountsSummary.innerHTML = `
      <p class="invo-addr-1">
      ${new Intl.NumberFormat().format(openBalance)} <br/>
       ${new Intl.NumberFormat().format(receipts)}<br/>
       ${new Intl.NumberFormat().format(payments)}<br/>
       ${new Intl.NumberFormat().format(openBalance + receipts - payments)}<br/>
     </p>
      `;
    });
};

getAccounts();

// document.getElementById("deleteExpense").addEventListener("click", () => {
//   const idd = document.getElementById("exId").value;
//   deleteExpense(idd);
// });

const deleteItem = (expenseId) => {
  var x = confirm("Are you sure you want to delete?");

  if (x) {
    fetch("/delete-accounts", {
      method: "post",
      headers: new Headers({ "Content-Type": "application/json" }),
      body: JSON.stringify({ id: expenseId }),
    })
      .then((res) => res.json())
      .then((response) => {
        if (response.message == "success") {
          location.replace("/accounts");
        } else {
          var x = confirm(
            "Error Occurred, Try again later. If this persist, contact support"
          );
        }
      });
  }
};
