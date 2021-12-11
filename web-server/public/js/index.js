console.log("js from the client!");

const weatherForm = document.querySelector("form");
const searchElement = document.querySelector("input");
const messageOne = document.querySelector("#message-1");
const messageTwo = document.querySelector("#message-2");

weatherForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const location = searchElement.value;

  messageOne.textContent = "loading....";
  messageTwo.textContent = "";
  console.log(location);
  fetch("http://localhost:3000/weather?address=" + location).then((data) => {
    data.json().then((data) => {
      if (data.error) {
        messageOne.textContent = data.error;
      } else {
        // console.log(data.location);
        // console.log(data.forecast);
        messageOne.textContent = data.location;
        messageTwo.textContent = data.forecast;
      }
    });
  });
});

//  fetch("http://localhost:3000/weather?address=" + location).then((data) => {
//    data
//      .json()
//      .then((data) => {
//        console.log(data.forecast, data.location);
//      })
//      .catch((error) => {
//        console.log(error);
//      });
//  });

// fetch("http://localhost:3000/weather?address=Nigeria").then((data) => {
//   //   data.json().then((data) => {
//   console.log(data.forecast, data.location);
//   //   });
// });
