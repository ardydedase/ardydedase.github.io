$(function() {
    var numDays = 2;
    var appId = 'b231606340553d9174136f7f083904b3';
    var location = 'singapore';
    var apiUrl = 'https://api.openweathermap.org/data/2.5/forecast/daily';

    // get daily weather forecast
    $.ajax({
        url: apiUrl,
        jsonp: "callback",
        data: {
            appid: appId,
            cnt: numDays,
            q: location,
            units: 'metric'
        },
        dataType: "jsonp",
        success: function( response ) {
            console.log("retrieved response:");
            console.log(response);
            runPredictions(response);
        }
    });
});

function getWeatherSituation(weatherId) {
    // 1 = Clear, 2 = Misty, 3 = Light rain or snow, 4 = heavy rain
    var weatherConditionsMapping = [];
    // var mappedWeather = {'clear': 1, 'misty': 2, 'lightrain': 3}
    weatherConditionsMapping[1] = [800, 801, 802, 803, 951, 952, 953, 954];
    weatherConditionsMapping[2] = [701, 711, 721, 731, 741, 751, 761, 762, 771, 781];
    weatherConditionsMapping[3] = [200, 201, 210, 230, 230, 300, 301, 302, 310, 311, 500, 501, 520, 521, 600, 601, 611, 612, 615, 620, 621, 804, 955, 956];
    weatherConditionsMapping[4] = [202, 211, 212, 221, 231, 232, 312, 313, 314, 321, 502, 503, 504, 511, 522, 531, 602, 616, 622, 900, 901, 902, 903, 904, 905, 906, 957, 958, 959, 960, 961, 962];

    for (var i = 1; i < 5; i++) {
        console.log("weatherId:");
        console.log(weatherId);
        if ($.inArray(weatherId, weatherConditionsMapping[i])) {
            return i;
        }
    }

    return 1;

}

function getWeekday(unixTimeStamp) {
    // var unixTimeStamp = 1509854400;
    var timestampInMilliSeconds = unixTimeStamp*1000; //as JavaScript uses milliseconds; convert the UNIX timestamp(which is in seconds) to milliseconds.
    var date = new Date(timestampInMilliSeconds); //create the date object    
    console.log("received date:");
    console.log(date);
    return date.getDay();

}

function calculateRawPredictivateValue(hour, dailyWeatherData) {
    var chr = 3.095678; 
    var choliday = -14.527039; // Whether it is holiday or not
    var cweekday = 2.274601; // Day of the week
    var cweathersit = -12.239456; // 1 = Clear, 2 = Misty, 3 = Light rain or snow, 4 = heavy rain
    var ctemp = 335.339553 * 41; // Degree celsius
    var catemp = 25.301369 * 50; // Degree celsius
    var chum = -78.364862 * 100; // %
    var cwindspeed = -21.393127 * 67; // mph 

    var weekday = getWeekday(dailyWeatherData.dt);
    var weatherSituation = getWeatherSituation(dailyWeatherData.weather[0].id);
    console.log("weatherSituation:");
    console.log(weatherSituation);
    console.log(weekday);

    // Using linear regression to calculate the raw value
    var adjustedTemp = dailyWeatherData.temp.day / 50;
    var adjustedATemp = dailyWeatherData.temp.day / 50;
    var adjustedHumidity = dailyWeatherData.humidity / 100;
    var adjustedWindSpeed = 0.2836;

    console.log("adjusted data:");
    console.log(adjustedTemp, adjustedATemp, adjustedHumidity, adjustedWindSpeed);
    console.log("hour: " + hour);

    var holiday = 0;

    if (weekday == 0 || weekday == 6) {
        holiday = 1;
    }

    var rawPredictedValue = 
        (chr * hour) + 
        (choliday * holiday) + 
        (cweekday * weekday) + 
        (cweathersit * weatherSituation) + 
        (ctemp * adjustedTemp) + 
        (catemp * adjustedATemp) + 
        (chum * adjustedHumidity) + 
        (cwindspeed * adjustedWindSpeed);

    return rawPredictedValue;
} 

function getPredictedDemand(dailyWeatherData) {
    // hour (0 to 23)
    // weatherSituation
    // temperature day / feeling vs actual?
    // humidity
    // windspeed

    var timestampInMilliSeconds = dailyWeatherData.dt * 1000; 
    var date = new Date(timestampInMilliSeconds); //create the date object    

    var panel = $('<div class="panel panel-default"> <div class="panel-heading"> <h3 class="panel-title"></h3> </div> <div class="panel-body"> <ul></ul> </div></div>');
    panel.find(".panel-title").append(date);
    var rawPredictedValue;
    for (var i = 0; i < 24; i++) {
        rawPredictedValue = calculateRawPredictivateValue(i, dailyWeatherData);
        console.log("rawPredictedValue: " + rawPredictedValue);
        // Calculate the range of possible values
        // RMSE = 0.89
        var minPredicatedValue = rawPredictedValue - ((1 - 0.89) * rawPredictedValue);
        var maxPredictedValue = rawPredictedValue + ((1 - 0.89) * rawPredictedValue);
        console.log(minPredicatedValue + " to " + maxPredictedValue);

        panel.find("ul").append("<li>HR" + (i + 1) + ": " + minPredicatedValue + " to " + maxPredictedValue + "</li>");
    }

    $("#result").append(panel);


}

function runPredictions(dailyWeatherList) {
    console.log("running predictions");
    dailyWeatherList.list.map(function(dailyWeatherData) {
        var rawPredictedValue = getPredictedDemand(dailyWeatherData);
    });
}