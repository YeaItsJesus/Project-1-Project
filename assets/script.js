//API URLS

var latestPhonesUrl = "http://phone-specs-api.azharimm.dev/latest";
//latest: Endpoint":"/latest", Example:"http://phone-specs-api.azharimm.dev/latest"

var phoneBrandsUrl = "http://phone-specs-api.azharimm.dev/brands";
//list_brands: Endpoint:"/brands", Example":"http://phone-specs-api.azharimm.dev/brands"

var phoneSpecsUrl =
  "http://phone-specs-api.azharimm.dev/search?query={phoneNameGoesHere";
//phone_specs: Endpoint:"/{phone_slug}" ,Example":"http://phone-specs-api.azharimm.dev/apple_iphone_12_pro_max-10237"

var searchForPhoneUrl =
  "http://phone-specs-api.azharimm.dev/search?query={userInputGoesHere}";
//search: Endpoint:"/search", Example":"http://phone-specs-api.azharimm.dev/search?query=Iphone 12 pro max"

var searchTopPhonesByInterest = "http://phone-specs-api.azharimm.dev/top-by-interest"
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
      console.log(data);
      //Latest Phones

  });
};

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


/*
//Calls searchForPhone API
function getLatestPhones() {
  fetch(searchForPhoneUrl)
    .then(function (response) {
      //Parses response into json
      return response.json();
    })
    .then(function (data) {
    //console log to review data received
      console.log(data);
      //Phone(s)

    });
    };
*/


/*
//Calls searchTopPhonesByInterest API
function getLatestPhones() {
  fetch(searchTopPhonesByInterestUrl)
    .then(function (response) {
      //Parses response into json
      return response.json();
    })
    .then(function (data) {
    //console log to review data received
      console.log(data);
      //Top phones by interest

    });
    };
*/


