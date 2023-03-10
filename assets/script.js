//API URLS

var latestPhonesUrl = "http://phone-specs-api.azharimm.dev/latest";
//latest: Endpoint":"/latest", Example:"http://phone-specs-api.azharimm.dev/latest"

var phoneBrandsUrl = "http://phone-specs-api.azharimm.dev/brands";
//list_brands: Endpoint:"/brands", Example":"http://phone-specs-api.azharimm.dev/brands"

var phoneSpecsUrl =
  "http://phone-specs-api.azharimm.dev/apple_iphone_13_mini-11104";
//phone_specs: Endpoint:"/{phone_slug}{apple_iphone_13_mini-11104}" ,Example":"http://phone-specs-api.azharimm.dev/apple_iphone_12_pro_max-10237"

var searchForPhoneUrl =
  "http://phone-specs-api.azharimm.dev/search?query={name of searched phone goes here}";
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

//getLatestPhones();

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

//Calls phoneSpecs API
function getPhoneSpecs() {
  fetch(phoneSpecsUrl)
    .then(function (response) {
      //Parses response into json
      return response.json();
    })
    .then(function (data) {
      //console.log(data);
      //phone specs
      var phoneBrand = data.data.brand;
      var phoneName = data.data.phone_name;
      var releaseDate = data.data.release_date;
      var storageOptions = data.data.storage;
      var thumbnail = data.data.thumbnail;
      var screenSize =
        data.data.specifications[3].specs[1].val[0].split(",")[0];
      var mainCamera = data.data.specifications[6].specs[0].val[0];
      var frontCamera = data.data.specifications[7].specs[0].val[0];
      var colorOptions = data.data.specifications[12].specs[0].val[0];
      var phonePrice =
        data.data.specifications[12].specs[4].val[0].split("/")[0];
      //console.log(phonePrice)
    });
}

//getPhoneSpecs();

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
      var phoneSlug = phone.slug;

      //Search results return (brand, specs link "detail", image, phone_name)
    });
}

//searchForPhone();

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

//getTopPhones();
