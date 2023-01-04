$(document).ready(function () {
  (function ($) {
    "use strict";

    jQuery.validator.addMethod(
      "answercheck",
      function (value, element) {
        return this.optional(element) || /^\bcat\b$/.test(value);
      },
      "type the correct answer -_-"
    );

    // validate contactForm form
    $(function () {
      $("#contactForm").validate({
        rules: {
          name: {
            required: true,
            minlength: 2,
          },
          subject: {
            required: true,
            minlength: 4,
          },
          number: {
            required: true,
            minlength: 5,
          },
          email: {
            required: true,
            email: true,
          },
          message: {
            required: true,
            minlength: 20,
          },
        },
        messages: {
          name: {
            required: "come on, you have a name, don't you?",
            minlength: "your name must consist of at least 2 characters",
          },
          subject: {
            required: "come on, you have a subject, don't you?",
            minlength: "your subject must consist of at least 4 characters",
          },
          number: {
            required: "come on, you have a number, don't you?",
            minlength: "your Number must consist of at least 5 characters",
          },
          email: {
            required: "no email, no message",
          },
          message: {
            required:
              "um...yea, you have to write something to send this form.",
            minlength: "thats all? really?",
          },
        },
        submitHandler: function (form) {
          const namee = document.querySelector("#name");
          const email = document.querySelector("#email");
          const number = document.querySelector("#number");
          const subject = document.querySelector("#subject");
          const message = document.querySelector("#message");
          const submitBtn = document.querySelector(".submit_btn");

          const formData = {
            name: namee.value,
            number: number.value,
            email: email.value,
            subject: subject.value,
            message: message.value,
          };

          // sendData("/contact", formData);

          $(form).ajaxSubmit({
            type: "POST",
            // data: $(form).serialize(),
            data: formData,
            url: "http://localhost:3000/contact",
            success: function () {
              sendData("/contact", formData);
              $("#contactForm :input").attr("disabled", "disabled");
              $("#contactForm").fadeTo("slow", 1, function () {
                $(this).find(":input").attr("disabled", "disabled");
                $(this).find("label").css("cursor", "default");
                $("#success").fadeIn();
                $(".modal").modal("hide");
                $("#success").modal("show");
              });
            },
            error: function () {
              $("#contactForm").fadeTo("slow", 1, function () {
                $("#error").fadeIn();
                $(".modal").modal("hide");
                $("#error").modal("show");
              });
            },
          });
        },
      });
    });
  })(jQuery);
});

// const namee = document.querySelector("#name");
// const email = document.querySelector("#email");
// const number = document.querySelector("#number");
// const subject = document.querySelector("#subject");
// const message = document.querySelector("#message");
// const submitBtn = document.querySelector(".submit_btn");

// submitBtn.addEventListener("click", (e) => {
//   if (namee.value.length < 2) {
//     alert("Enter phone");
//   } else if (email.value.length < 5) {
//   } else if (number.value.length < 5) {
//   } else if (subject.value.length < 4) {
//   } else if (message.value.length < 20) {
//   } else {
//     sendData("/contact", {
//       namee: namee.value,
//       number: number.value,
//       email: email.value,
//       subject: subject.value,
//       message: message.value,
//     });
//   }
// });

const sendData = (path, data) => {
  console.log("=xxxxxx==");
  console.log(data);
  console.log("==xxxxx====");
  fetch(path, {
    method: "post",
    headers: new Headers({ "Content-Type": "application/json" }),
    body: JSON.stringify(data),
  })
    .then((res) => res.json())
    .then((response) => {
      console.log(response);
    });
};
