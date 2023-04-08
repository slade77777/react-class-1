export function sum(a: number, b: number): Function {
  var c = 10;

  return function sumComplex() {
    return a + b * c;
  }
}
