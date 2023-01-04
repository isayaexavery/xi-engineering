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

let submitOpenBtn = document.querySelector(".open-submit-btn");
submitOpenBtn.addEventListener("click", () => {
  const openBalance = document.getElementById("open-balance").value;
  const startDate = document.getElementById("start-date").value;
  const endDate = document.getElementById("end-date").value;

  console.log(openBalance);

  if (!openBalance) {
    return alert("Please Enter Amount");
  }

  fetch("/add-open-balance", {
    method: "post",
    headers: new Headers({ "Content-Type": "application/json" }),
    body: JSON.stringify({
      openBalance: +openBalance,
      startDate: startDate,
      endDate: endDate,
    }),
  })
    .then((res) => res.json())
    .then((response) => {
      document.getElementById("open-balance").value = "";
      document.getElementById("start-date").value = "";
      document.getElementById("end-date").value = "";
    });
});

let submitMemberBtn = document.querySelector(".submit-member-btn");
submitMemberBtn.addEventListener("click", () => {
  const firstName = document.getElementById("first-name").value;
  const lastName = document.getElementById("second-name").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const employeeId = document.getElementById("employeeId").value;
  const designation = document.getElementById("designation").value;
  const priority = document.getElementById("priority").value;

  if (
    !firstName ||
    !lastName ||
    !email ||
    !password ||
    !employeeId ||
    !designation ||
    !priority
  ) {
    return alert("Please Enter Amount");
  }

  const data = {
    firstName,
    lastName,
    email,
    password,
    employeeId,
    designation,
    priority: +priority,
  };

  console.log(data);

  fetch("/add-member", {
    method: "post",
    headers: new Headers({ "Content-Type": "application/json" }),
    body: JSON.stringify(data),
  })
    .then((res) => res.json())
    .then((response) => {
      console.log(response);
      if (response.message == "success") {
        alert("Successfully");
      }

      if (response.error == "error") {
        alert("E-mail exists");
      }
    });
});
