//API URLS

var latestPhonesUrl = "http://phone-specs-api.azharimm.dev/latest";
//latest: Endpoint":"/latest", Example:"http://phone-specs-api.azharimm.dev/latest"

var phoneBrandsUrl = "http://phone-specs-api.azharimm.dev/brands";
//list_brands: Endpoint:"/brands", Example":"http://phone-specs-api.azharimm.dev/brands"

var phoneSpecsUrl =
  "http://phone-specs-api.azharimm.dev/search?query={phoneNameGoesHere";
//phone_specs: Endpoint:"/{phone_slug}" ,Example":"http://phone-specs-api.azharimm.dev/apple_iphone_12_pro_max-10237"

var searchForPhoneUrl =
  "http://phone-specs-api.azharimm.dev/search?query={user input goes here}";
//search: Endpoint:"/search", Example":"http://phone-specs-api.azharimm.dev/search?query=Iphone 12 pro max"

var searchTopPhonesByInterestUrl =
  "http://phone-specs-api.azharimm.dev/top-by-interest";
//top_by_interest: Endpoint:"/top-by-interest", Example":"http://phone-specs-api.azharimm.dev/top-by-interest"

//Calls latestPhones API
function getLatestPhones() {
  fetch(latestPhonesUrl)
    .then(function (response) {
      //Parses response into json
      return response.json();
    })
    .then(function (data) {
      //console log to review data received
      //console.log(data.data.phones);
      //18 Latest Phones
      //Each listed phones contains an image(phonesList[i].image) and phone name(phonesList[i].phone_name)
      var phonesList = data.data.phones;
    });
}

getLatestPhones();

/*
//Calls phoneBrands API
function getLatestPhones() {
  fetch(phoneBrandsUrl)
    .then(function (response) {
      //Parses response into json
      return response.json();
    })
    .then(function (data) {
    //console log to review data received
      console.log(data);
      //Phones brand(s)

    });
  };
*/

/*
//Calls phoneSpecs API
function getLatestPhones() {
  fetch(phoneSpecsUrl)
    .then(function (response) {
      //Parses response into json
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      //phone specs
      var specsUrl = data.data.phones[0].detail;
      //Calls phone specs url
      fetch(specsUrl)
        .then(function (response) {
          //parses response into json
          return response.json();
        })
        .then(function (phoneSpecs) {
          //log phone specs array
          console.log(phoneSpecs);
        });
    });
  };
*/

//Calls searchForPhone API
function searchForPhone() {
  fetch(searchForPhoneUrl)
    .then(function (response) {
      //Parses response into json
      return response.json();
    })
    .then(function (data) {
      //console log to review data received
      //console.log(data);
      //Phone
      var phone = data.data.phones[0];
      var phoneName = phone.phone_name;
      var phoneImage = phone.image;
      var phoneBrand = phone.brand;
      //Search results return (brand, specs link "detail", image, phone_name)
    });
}

searchForPhone();

//Calls searchTopPhonesByInterest API
function getTopPhones() {
  fetch(searchTopPhonesByInterestUrl)
    .then(function (response) {
      //Parses response into json
      return response.json();
    })
    .then(function (data) {
      //console log to review data received
      //console.log(data);
      //Top By Daily Interest Phones (10 phone names listed)
      var phonesList = data.data.phones;
    });
}

getTopPhones();


//Turn hamburger menu in the top left into a button. Create an event listener for the hamburger button. 
//This event listener should contain a function that toggles the visibility of the dropdown menu.



var hamburgerMenu = document.getElementById("hamburgermenu")

hamburgerMenu.addEventListener('click', console.log('hamburger was clicked'))