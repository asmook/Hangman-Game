// var num1 = parseInt(process.argv[2])
// var operater = process.argv[3]
// var num2 = parseInt(process.argv[4])


// if (operater == "+"){
// 	console.log(num1 + num2)
// }else if (operater == "-"){
// 	console.log(num1 - num2)
// }else if (operater == "x"){
// 	console.log(num1 * num2)
// }else if (operater == "/"){
// 	console.log(num1 / num2)
// }else if (operater == "%"){
// 	console.log(num1 % num2)
// }else {
// 	console.log("that is not a function")
// }



// creating a variable = is parse means taking parsts of a string and turning into an integer
// int is the integer (process.argv[]) is an array of strings. 
// 
var input = parseInt(process.argv[2])

function sumMultSix (max){
	var total = 0;
	for (var i = 6; i < max; i++) {
	if (i % 6 === 0) {
		total += i;
	}


	}
	console.log(total);
}
sumMultSix (input)




