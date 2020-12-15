//this is an array that will take the input from CLI
const input = []; 
let lineLength = ''; 
let arrayLength = '';
// taking the input cutting off extras produced by process.argv and pushing it into the array
for (i = 2; i < process.argv.length; i++) {
  input.push(process.argv[i]);
  if (process.argv[i].length > lineLength) lineLength = process.argv[i].length;
}
// declaring length based on the number of characters
arrayLength = input.length;
// this function prints out a '-' that is preceded and followed by a starting/ending character defined in functions below
function border(firstChar, lastChar, n) {
  console.log(firstChar + '\u2501'.repeat(n) + lastChar);
}
// these 3 functions print a top, bottom and innter left and right corner symbols with 'n' lines and pass 'n' as an argument for the border function above
function top(n) {
  border("\u250F", "\u2513", n);
}
function bottom(n) {
  border("\u2517", "\u251B", n);
}
function inner(n) {
  border("\u2523", "\u2528", n);
}

// printing ouput array with lines from functions above. We are adding empty spaces (using padEnd method) to shorter input elements up to the lenght of the longest element to ensure equal length of each line  
function printOutputArray(output) {
  let i = 0;
  for (let element of output) {
    result = "\u2503" + element.padEnd(lineLength, " ") + "\u2503";
    console.log(result);
    if (i !== arrayLength-1) inner(lineLength);
    i++;
  }
}

// finally, we are printing a top line, our desired output and lastly, a bottom line
top(lineLength); 
printOutputArray(input);
bottom(lineLength);