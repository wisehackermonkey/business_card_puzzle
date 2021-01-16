

// validate that the user is submitting a unique and correct answer
let validate_guess = (guesses, correct_flags) => {
    guesses = guesses.map(x=> x.toString())
    correct_flags = correct_flags.map(x=> x.toString())
    are_equal = areEqual(guesses,correct_flags) === true
    are_unique = is_unique_array(guesses)
   return are_equal && are_unique

   
}

// [Check if values of two arrays are the same/equal in JavaScript](https://www.tutorialspoint.com/check-if-values-of-two-arrays-are-the-same-equal-in-javascript)
let areEqual = (first, second) => {
    if(first.length !== second.length){
       return false;
    };
    for(let i = 0; i < first.length; i++){
       if(!second.includes(first[i])){
          return false;
       };
    };
    return true;
 };

// check if the array is uneque
let is_unique_array = (array)=>{
    temp = array.filter(onlyUnique)
    return temp.length >=array.length
}
// helper function
// Get all unique values in a JavaScript array (remove duplicates)
// https://stackoverflow.com/a/14438954/5460870
let onlyUnique = (value, index, self) => {
    return self.indexOf(value) === index;
}
module.exports = {
    onlyUnique,
    validate_guess,
    is_unique_array
}