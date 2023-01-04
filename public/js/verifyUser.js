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
        console.log("Not expired");

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
        console.log("expired");
        location.replace("/login");
      }
    });
} else {
  location.replace("/login");
}
