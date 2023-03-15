//API URLS

var latestPhonesUrl = "http://phone-specs-api.azharimm.dev/latest";
//latest: Endpoint":"/latest", Example:"http://phone-specs-api.azharimm.dev/latest"

var phoneBrandsUrl = "http://phone-specs-api.azharimm.dev/brands";
//list_brands: Endpoint:"/brands", Example":"http://phone-specs-api.azharimm.dev/brands"

var searchTopPhonesByInterestUrl =
  "http://phone-specs-api.azharimm.dev/top-by-interest";
//top_by_interest: Endpoint:"/top-by-interest", Example":"http://phone-specs-api.azharimm.dev/top-by-interest"

var displayContainerTitleEl = $("#displayContainerTitle");

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
  $("#latestPhones-container").html("");
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
      var latestPhonesContainer = $("#latestPhones-container");

      phoneContainerEl = $("<div>").addClass(
        "p-4 mx-2 bg-zinc-600 text-slate-300 rounded-md md:flex "
      );
      imgEl = $("<img>")
        .addClass("object-contain mx-auto rounded-md md:w-1/4")
        .attr("src", phones[i].thumbnail);
      specsContainerEl = $("<div>").addClass("py-3 space-y-3 md:px-5 w-full");
      deviceNameEl = $("<h1>")
        .addClass("text-center text-4xl md:text-5xl")
        .text(phones[i].phoneBrand + " " + phones[i].phoneName);
      specsTitleEl = $("<h2>")
        .addClass("border-b text-2xl md:text-3xl")
        .text("Specifications:");
      releaseDateEl = $("<p>")
        .addClass("text-1xl md:text-2xl")
        .text("Release Date: " + phones[i].releaseDate);
      mainCameraEl = $("<p>")
        .addClass("text-1xl md:text-2xl")
        .text("Main Camera(s): " + phones[i].mainCamera);
      frontCameraEl = $("<p>")
        .addClass("text-1xl md:text-2xl")
        .text("Selfie Camera(s): " + phones[i].frontCamera);
      colorOptionsEl = $("<p>")
        .addClass("text-1xl md:text-2xl")
        .text("Color Options: " + phones[i].colorOptions);
      storageOptionsEl = $("<p>")
        .addClass("text-1xl md:text-2xl")
        .text("Storage Options: " + phones[i].storageOptions);
      screenSizeEl = $("<p>")
        .addClass("text-1xl md:text-2xl")
        .text("Screen Size: " + phones[i].screenSize);

      latestPhonesContainer.append(
        phoneContainerEl.append(
          imgEl,
          specsContainerEl.append(
            deviceNameEl,
            specsTitleEl,
            releaseDateEl,
            mainCameraEl,
            frontCameraEl,
            colorOptionsEl,
            storageOptionsEl,
            screenSizeEl
          )
        )
      );
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
  displayContainerTitleEl.text("Latest Phones Announced:");
});

getLatestPhones();

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
  displayContainerTitleEl.text("Top Phones By Interest:");
}

//IMEI API

function getIMEIinfo(userIMEI) {
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "0aee9a94d4mshb908c01c8187bd5p105898jsn5186d0a850dc",
      "X-RapidAPI-Host": "kelpom-imei-checker1.p.rapidapi.com",
    },
  };

  return fetch(
    `https://kelpom-imei-checker1.p.rapidapi.com/api?service=model&imei=${userIMEI}`,
    options
  )
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      var phoneModel = data.model.model_nb;
      return phoneModel;
    });
}

//Search phone IMEI
var IMEIsearchBar = $("#IMEIsearchBar");
var IMEIsearchField = $("#IMEIsearch");

IMEIsearchBar.submit(function (event) {
  event.preventDefault();

  var userIMEI = IMEIsearchField.val();
  getIMEIinfo(userIMEI)
    .then(function (phoneModel) {
      return fetch(
        `http://phone-specs-api.azharimm.dev/search?query=${phoneModel}`
      );
    })
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
      IMEIsearchField.val("");
      displayContainerTitleEl.text("IMEI Results:");
    });
});

//Searches For a Phone when user submits a search
var searchBar = $("#search-bar");
var searchField = $("#search");

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
      //Phone
      var phone = data.data.phones[0];
      renderPhoneList([phone]);
      displayContainerTitleEl.text("Phone Results:");
    });
});
