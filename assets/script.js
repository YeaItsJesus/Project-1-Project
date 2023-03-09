//API URLS

var latestPhonesUrl = "http://phone-specs-api.azharimm.dev/latest";
//latest:{"endpoint":"/latest","example":"http://phone-specs-api.azharimm.dev/latest"}

var phoneBrandsUrl = "http://phone-specs-api.azharimm.dev/brands";
//list_brands:{"endpoint":"/brands","example":"http://phone-specs-api.azharimm.dev/brands"}

var phoneSpecsUrl =
  "http://phone-specs-api.azharimm.dev/search?query={phoneNameGoesHere";
//phone_specs:{"endpoint":"/{phone_slug}","example":"http://phone-specs-api.azharimm.dev/apple_iphone_12_pro_max-10237"}

var searchForPhoneUrl =
  "http://phone-specs-api.azharimm.dev/search?query={userInputGoesHere}";
//search:{"endpoint":"/search","example":"http://phone-specs-api.azharimm.dev/search?query=Iphone 12 pro max"}

var searchTopPhonesByInterest = "http://phone-specs-api.azharimm.dev/top-by-interest"
//top_by_interest:{"endpoint":"/top-by-interest","example":"http://phone-specs-api.azharimm.dev/top-by-interest"}


//Calls phoneSpecs API
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

/*
//Calls phoneSpecs API
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
*/
