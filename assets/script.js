//API URLS

var latestPhonesUrl = "http://phone-specs-api.azharimm.dev/latest";
//latest: Endpoint":"/latest", Example:"http://phone-specs-api.azharimm.dev/latest"

var phoneBrandsUrl = "http://phone-specs-api.azharimm.dev/brands";
//list_brands: Endpoint:"/brands", Example":"http://phone-specs-api.azharimm.dev/brands"

var searchTopPhonesByInterestUrl =
  "http://phone-specs-api.azharimm.dev/top-by-interest";
//top_by_interest: Endpoint:"/top-by-interest", Example":"http://phone-specs-api.azharimm.dev/top-by-interest"

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
      return phonesList;
    })
    .then(renderPhoneList);
}

function renderPhoneList(phonesList) {
  $("#latest-phones").html("");
  var phones = [];

  // Create an array of promises that will resolve with the phone specs data
  var promises = phonesList.slice(0, 10).map(function (phone) {
    return fetch(`http://phone-specs-api.azharimm.dev/${phone.slug}`)
      .then(function (response) {
        //Parses response into json
        return response.json();
      })
      .then(function (data) {
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

        phones.push({
          phoneBrand: phoneBrand,
          phoneName: phoneName,
          releaseDate: releaseDate,
          storageOptions: storageOptions,
          thumbnail: thumbnail,
          screenSize: screenSize,
          mainCamera: mainCamera,
          frontCamera: frontCamera,
          colorOptions: colorOptions,
        });
      });
  });

  // Wait for all the promises to resolve before updating the HTML
  Promise.all(promises).then(function () {
    //Update HTML with phone specs
    for (i = 0; i < promises.length; i++) {
      var phoneDiv = $("#phone" + (i + 1));
      phoneDiv
        .find("#phone-name")
        .text(phones[i].phoneBrand + " " + phones[i].phoneName);
      phoneDiv
        .find("#release-date")
        .text("Release Date: " + phones[i].releaseDate);
      phoneDiv
        .find("#main-camera")
        .text("Main Camera(s): " + phones[i].mainCamera);
      phoneDiv
        .find("#selfie-camera")
        .text("Selfie Camera(s): " + phones[i].frontCamera);
      phoneDiv
        .find("#color-options")
        .text("Color Options: " + phones[i].colorOptions);
      phoneDiv
        .find("#storage-options")
        .text("Storage Options: " + phones[i].storageOptions);
      phoneDiv
        .find("#screen-size")
        .text("Screen Size: " + phones[i].screenSize);

      phoneDiv.find("#phone-thumbnail").attr("src", phones[i].thumbnail);
    }
    console.log(phones);
  });
}

//Nav button click event listener

var hamburgerMenu = $("#menu-button");
var menuLinks = $("#nav-menu");

hamburgerMenu.on("click", () => {
  menuLinks.toggle();
  console.log("The nav menu was clicked!");
});

//Top Phones Link click event listener

var topPhonesLink = $("#topPhonesLink");

topPhonesLink.on("click", () => {
  getTopPhones();
});

//Latest Phones Link click event listener

var latestPhonesLink = $("#latestPhonesLink");

latestPhonesLink.on("click", () => {
  getLatestPhones();
});

getLatestPhones();

/*
//Calls phoneBrands API
function getPhoneBrands() {
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
      return phonesList;
    })
    .then(renderPhoneList);
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
      renderPhoneList([phone]);

      /*
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
        */
    });
});
