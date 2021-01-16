// validations that the code actually catches incorrect answers
// by oran collins
// github.com/wisehackermonkey
// oranbusiness@gmail.com
// 20210116

const {
    validate_guess,
    is_unique_array
} = require('./validations.js')

require('dotenv').config({
    path: "./.test.env"
})

test("returns a unique array", () => {
    expect(is_unique_array([222, 333, 111])).toBe(true);
    expect(is_unique_array([1, 1, 1])).toBe(false);
    expect(is_unique_array([1, 1, 0])).toBe(false);
})

test("is array of answers correct", () => {
    expect(validate_guess([1, 2, 3], [1, 2, 3])).toBe(true);
    expect(validate_guess([1, 2, 3], [3, 2, 1])).toBe(true);
    expect(validate_guess([1, 1, 1], [3, 2, 1])).toBe(false);

})

test("check if guesses match env file definition", () => {

    correct_guesses = [process.env.FLAG1, process.env.FLAG2, process.env.FLAG3]
    FLAG1 = 123456789
    FLAG2 = 999999999
    FLAG3 = 111111111

    guesses = [FLAG1, FLAG2, FLAG3]
    console.log(guesses)
    console.log(correct_guesses)
    // if the user entered multple correct answers preventing a false win
    expect(validate_guess(guesses, correct_guesses)).toBe(true)
})