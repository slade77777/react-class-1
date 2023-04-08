var memorizeFunction = function(functionUsing: Function) {
  var oldResult = {};
  return function (arg1, arg2) {
    var inputs = `${arg1}-${arg2}`;
    if (oldResult[inputs]) {
      return oldResult[inputs];
    } else {
      var newResult = functionUsing(arg1, arg2);
      oldResult[`${arg1}-${arg2}`] = newResult;
      return newResult;
    }
  }
}
function sum(a: number, b: number): number {
  return a + b;
}

var memorizeSum = memorizeFunction(sum);
//@ts-ignore
console.log(memorizeSum(3 ,5));
//@ts-ignore
console.log(memorizeSum(3 ,5));