//API URLS

var latestPhonesUrl = "http://phone-specs-api.azharimm.dev/latest";
//latest: Endpoint":"/latest", Example:"http://phone-specs-api.azharimm.dev/latest"

var phoneBrandsUrl = "http://phone-specs-api.azharimm.dev/brands";
//list_brands: Endpoint:"/brands", Example":"http://phone-specs-api.azharimm.dev/brands"

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
      //18 Latest Phones
      //Each listed phones contains an image(phonesList[i].image) and phone name(phonesList[i].phone_name and specs (phonesList[i].detail) and phone slug (phonesList[i].slug))
      var phonesList = data.data.phones;
      //console.log(phonesList);
      for (i = 0; i < 10; i++) {
        var phoneName = phonesList[i].phone_name;
        var phoneImage = phonesList[i].image;
        var phoneSpecs = phonesList[i].detail;
        var phoneSlug = phonesList[i].slug;
        //Calls API to get phone specs
        fetch(`http://phone-specs-api.azharimm.dev/${phoneSlug}`)
          .then(function (response) {
            //Parses response into json
            return response.json();
          })
          .then(function (data) {
            console.log(data);
            //Get handle on phone specs
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
            //var phonePrice = data.data.specifications[12].specs[4].val[0].split("/")[0];

            console.log("---------------");
          });
      }
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
function getPhoneSpecs() {
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
        .then(function (data) {
          console.log(data);
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
        });
    });
  };
*/

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

var searchBar = $("#search-bar");
var searchField = $("#search");

//Searches For a Phone when user submits a search
searchBar.submit(function (event) {
  event.preventDefault(); // prevent default behavior of form submission
  //Get searchfield value
  var userInput = searchField.val();
  //Calls searchForPhone API
  fetch(`http://phone-specs-api.azharimm.dev/search?query=${userInput}`)
    .then(function (response) {
      //Parses response into json
      return response.json();
    })
    .then(function (data) {
      //console log to review data received
      console.log(data);
      //Phone
      var phone = data.data.phones[0];
      var phoneName = phone.phone_name;
      var phoneImage = phone.image;
      var phoneBrand = phone.brand;
      var phoneSlug = phone.slug;
      //Search results return (brand, specs link "detail", image, phone_name)

      //Calls API to get specs
      fetch(`http://phone-specs-api.azharimm.dev/${phoneSlug}`)
        .then(function (response) {
          //Parses response into json
          return response.json();
        })
        .then(function (data) {
          console.log(data);
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
        });
    });
});
