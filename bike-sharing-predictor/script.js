$(function() {
    $.ajax({
        url: 'https://api.openweathermap.org/data/2.5/forecast',
        jsonp: "callback",
        data: {
            appid: 'b231606340553d9174136f7f083904b3',
            cnt: 100,
            q: 'washington',
            units: 'metric'
        },
        dataType: "jsonp",
        success: function( response ) {
            console.log("openweathermap response:");
            console.log(response);
            
            $.each(response.list, function(i, v) {
                var localTime = moment(v.dt * 1000).utcOffset(-8);
                var localTimeFormatted = localTime.format("dddd, MMMM Do YYYY, h:mm:ss a");
                
                var hr = localTime.hour();
                var holiday = (localTime.day() == 0 || localTime.day() == 6) ? 1: 0;
                var weekday = localTime.day();
                var weathersit = getWeatherSituation(v.weather[0].id);
                var temp = v.main.temp / 41;
                var atemp = v.main.temp / 50;
                var hum = v.main.humidity / 100;
                var windspeed = v.wind.speed * 2.23694 / 67; // Converting mile to hours
                
                var x0 = hr , x1 = weekday, x2 = weathersit, x3 = temp, x4 = atemp, x5 = hum, x6 =  windspeed;
                
                var computedResult = (-5.3301887663e-10 * 1) + (30.2722996513 * x0) + (-21.173098399 * x1) + (24.8075983643 * x2) + (2952.20786578 * x3) + 
                    (-1996.32171928 * x4) + (386.954618467 * x5) + (-124.656286895 * x6) + (-1.37574286985 * Math.pow(x0, 2)) + (0.27862495285 * x0 * x1) + 
                    (0.00841493547958 * x0 * x2) + (-7.63207456732 * x0 * x3) + (22.943620423 * x0 * x4) + (-0.968479450965 * x0 * x5) + 
                    (2.85602175005 * x0 * x6) + (3.22743188937 * Math.pow(x1, 2)) + (-0.0453866052884 * x1 * x2) + (-23.5744631331 * x1 * x3) + 
                    (25.7366936041 * x1 * x4) + (0.540798506961 * x1 * x5) + (-8.16723477246 *x1 * x6) + (-17.4506750251 * Math.pow(x2, 2)) + 
                    (1.52633486328 * x2 * x3) + (7.29465061246 * x2 * x4) + (54.2684463091 * x2 * x5) + (-23.2500035032 * x2 * x6) + 
                    (4904.01669115 * Math.pow(x3, 2)) + (-15598.6028973 * x3 * x4) + (-21.9551085857 * x3 * x5) + (1119.64927251 * x3 * x6) + 
                    (10410.8160677 * Math.pow(x4, 2)) + (-821.368173676 * x4 * x5) + (-556.682403992 * x4 * x6) + (-247.717691307 * Math.pow(x5, 2)) + 
                    (-119.987557116 * x5 * x6) + ( -309.871126173 * Math.pow(x6, 2)) + (-303.154552627);
                
                var result = Math.round(computedResult);
                if (result < 0) {
                    result = 0;
                }
                
                // Print to console
                console.log(localTimeFormatted);
                console.log("hr: " + hr + ", holiday: " + holiday  + ", weekday: " + weekday  + ", weathersit: " + weathersit  + ", temp: " + temp  + ", atemp: " + atemp  + ", hum: " + hum  + ", windspeed: " + windspeed );
                console.log("Polynormial equation:" + Math.round(computedResult));
                console.log("Polynormial equation:" + result);
                
                
                var weatherCondition = "<img src='http://openweathermap.org/img/w/" + v.weather[0].icon + ".png'/><br/>" + 
                "Temperature: " + v.main.temp + "&#8451;<br/>" + 
                "Humility: " + v.main.humidity + "%<br/>" + 
                "Windspeed: " + Math.round(v.wind.speed * 2.23694 * 100) / 100 + "KM/h<br/>"
                ;
                    
                if (weekday == 0 || weekday == 6) {
                    $("#result_table").append("<tr><td>" + localTimeFormatted + "</td><td>" + weatherCondition + "</td><td>" + result + "</td></tr>");    
                }
                
                
                
                /*
                // Old equation
                // Coefficient
                var chr = 3.095678; 
                var choliday = -14.527039; // Whether it is holiday or not
                var cweekday = 2.274601; // Day of the week
                var cweathersit = -12.239456; // 1 = Clear, 2 = Misty, 3 = Light rain or snow, 4 = heavy rain
                var ctemp = 335.339553; // Degree celsius
                var catemp = 25.301369; // Degree celsius
                var chum = -78.364862; // %
                var cwindspeed = -21.393127; // mph 
                    
                var rawPredictedValue = 
                (chr * hr) + 
                (choliday * holiday) + 
                (cweekday * weekday) + 
                (cweathersit * weathersit) + 
                (ctemp * temp) + 
                (catemp * atemp) + 
                (chum * hum) + 
                (cwindspeed * windspeed);
                
                console.log("Old equation:" + rawPredictedValue);
                */
            });
        }
    });
});

// Convert openweathermap weather ID to our ID
function getWeatherSituation(weatherId) {
    // 1 = Clear, 2 = Misty, 3 = Light rain or snow, 4 = heavy rain
    var weatherConditionsMapping = [];
    weatherConditionsMapping[1] = [800, 801, 802, 803, 951, 952, 953, 954];
    weatherConditionsMapping[2] = [701, 711, 721, 731, 741, 751, 761, 762, 771, 781];
    weatherConditionsMapping[3] = [200, 201, 210, 230, 230, 300, 301, 302, 310, 311, 500, 501, 520, 521, 600, 601, 611, 612, 615, 620, 621, 804, 955, 956];
    weatherConditionsMapping[4] = [202, 211, 212, 221, 231, 232, 312, 313, 314, 321, 502, 503, 504, 511, 522, 531, 602, 616, 622, 900, 901, 902, 903, 904, 905, 906, 957, 958, 959, 960, 961, 962];

    for (var i = 1; i < 5; i++) {
        if ($.inArray(weatherId, weatherConditionsMapping[i])) {
            return i;
        }
    }
    // Default
    return 1;
}
