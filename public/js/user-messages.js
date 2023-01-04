let messageContainer = document.querySelector(".blog_left_sidebar");

const singleMessage = (data) => {
  const formattedDate = new Date(data.date);
  messageContainer.innerHTML += `
  <article class="row blog_item">
                               <div class="col-md-3">
                                   <div class="blog_info text-right">
                                        
                                        <ul class="blog_meta list">
                                            <li><a href="#">${
                                              data.name
                                            }<i class="lnr lnr-user"></i></a></li>
                                            <li><a href="#">${formattedDate.toUTCString()}<i class="lnr lnr-calendar-full"></i></a></li>
                                            <li><a href="#">${
                                              data.number
                                            }<i class="lnr lnr-eye"></i></a></li>
                                        </ul>
                                    </div>
                               </div>
                                <div class="col-md-9">
                                    <div class="blog_post">
                                        <img src="img/blog/main-blog/m-blog-1.jpg" alt="">
                                        <div class="blog_details">
                                            <a href="single-blog.html"><h2>${
                                              data.subject
                                            }</h2></a>a
                                            <p>${data.message}</p>
                                            <a href="message-view-${
                                              data._id
                                            }" class="white_bg_btn">View More</a>
                                        </div>
                                    </div>
                                </div>
                            </article>
  `;
};

const viewMessages = () => {
  fetch("/get-messages", {
    method: "get",
    headers: new Headers({ "Content-Type": "application/json" }),
  })
    .then((res) => res.json())
    .then((response) => {
      console.log(response);
      response.forEach((element) => {
        singleMessage(element);
      });
    });
};

// //viwew signle message
const messageId = decodeURI(location.pathname.split("-").pop());
console.log(" xxx " + messageId);

if (location.pathname == "/message-view-" + messageId) {
  const messageId = decodeURI(location.pathname.split("-").pop());
  console.log(" xxx " + messageId);

  let oneMessageContainerView = document.querySelector(".single-post");
  const singleMessageView = (data) => {
    const formattedDate = new Date(data.date);
    oneMessageContainerView.innerHTML += `

  <div class="col-lg-3  col-md-3">
  <div class="blog_info text-right">
        <ul class="blog_meta list">
        <li><a href="#">${data.name}<i class="lnr lnr-user"></i></a></li>
        <li><a href="#">${formattedDate.toUTCString()}<i class="lnr lnr-calendar-full"></i></a></li>
        <li><a href="#">${data.number}<i class="lnr lnr-eye"></i></a></li>
      </ul>

  </div>
</div>
<div class="col-lg-9 col-md-9 blog_details">
  <h2>${data.subject}</h2>
  <p class="excert">
  ${data.message}
  </p>
  
  <button id="submit_btn" onClick="deleteMessage()" class="btn submit_btn">Delete Message</button>
</div>
   `;
  };

  fetch("/get-messages", {
    method: "post",
    headers: new Headers({ "Content-Type": "application/json" }),
    body: JSON.stringify({ id: messageId }),
  })
    .then((res) => res.json())
    .then((response) => {
      console.log(response);
      singleMessageView(response);
    });

  //for deleting message
} else {
  viewMessages();
}

const deleteMessage = () => {
  // e.preventDefault();
  let check = confirm("Want to delete?");
  if (check) {
    fetch("/delete-message", {
      method: "post",
      headers: new Headers({ "Content-Type": "application/json" }),
      body: JSON.stringify({ id: messageId }),
    })
      .then((res) => res.json())
      .then((response) => {
        location.replace("/user-messages");
      });
  }
};
