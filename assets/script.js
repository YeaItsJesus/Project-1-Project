//API URLS

var latestPhonesUrl = "http://phone-specs-api.azharimm.dev/latest";

var phoneBrandsUrl = "http://phone-specs-api.azharimm.dev/brands";

var phoneSpecsUrl =
  "http://phone-specs-api.azharimm.dev/search?query=Iphone 12 pro max";

var searchPhonesUrl =
  "http://phone-specs-api.azharimm.dev/search?query=Iphone-12-pro-max";

//Calls API
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
