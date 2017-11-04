var chr = 3.095678;
var choliday = -14.527039; // Whether it is holiday or no
var cweekday = 2.274601; // Day of the week
var cweathersit = -12.239456; // 1 = Clear, 2 = Misty, 3 = Light rain or snow, 4 = heavy rain
var ctemp = 335.339553 * 41; // Degree celsius
var catemp = 25.301369 * 50; // Degree celsius
var chum = -78.364862 * 100; // %
var cwindspeed = -21.393127 * 67; // mph 

// Using linear regression to calculate the raw value
var rawPredictedValue = 
(chr * 0) + 
(choliday * 0) + 
(cweekday * 6) + 
(cweathersit * 2) + 
(ctemp * 0.46) + 
(catemp * 0.4545) + 
(chum * 0.72) + 
(cwindspeed * 0.2836)

// Calculate the range of possible values
// RMSE = 0.89
var minPredicatedValue = rawPredictedValue - ((1 - 0.89) * rawPredictedValue);
var maxPredictedValue = rawPredictedValue + ((1 - 0.89) * rawPredictedValue);
console.log(minPredicatedValue + " to " + maxPredictedValue);