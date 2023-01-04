const token = JSON.parse(localStorage.getItem("xiToken"));

console.log(token);
if (token) {
  fetch("/validateToken", {
    method: "post",
    headers: new Headers({ "Content-Type": "application/json" }),
    body: JSON.stringify({ xiToken: token.xiToken }),
  })
    .then((res) => res.json())
    .then((response) => {
      console.log("====================================");
      console.log(response);
      console.log("====================================");

      //check if token expired
      if (response.message == "success") {
        // not expired
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
          //remain here
          //location.replace("/login");
        }
      } else {
        console.log("expired");
        //remain here
        // location.replace("/login");
      }
    });
} else {
  //remain here
  //location.replace("/login");
}

const email = document.querySelector("#email");
const password = document.querySelector("#password");
const submitBtn = document.querySelector(".submit_btn");

submitBtn.addEventListener("click", () => {
  if (!email.value || !password.value) {
    return alert("Fill all the fields");
  }
  fetch("/login", {
    method: "post",
    headers: new Headers({ "Content-Type": "application/json" }),
    body: JSON.stringify({ email: email.value, password: password.value }),
  })
    .then((res) => res.json())
    .then((response) => {
      console.log(response);
      localStorage.setItem("xiToken", JSON.stringify(response));
      location.replace("/accounts");
    });
});
