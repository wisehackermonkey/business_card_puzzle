// validations that the code actually catches incorrect answers
// by oran collins
// github.com/wisehackermonkey
// oranbusiness@gmail.com
// 20210116

const { validate_guess,is_unique_array } = require('./validations.js')

require('dotenv').config({ path: "../.test.env" })

test("returns a unique array", ()=>{
    expect(is_unique_array([222,333,111])).toBe(true);
    expect(is_unique_array([1,1,1])).toBe(false);
    expect(is_unique_array([1,1,0])).toBe(false);
})

test("is array of answers correct",()=>{
    expect(validate_guess([1,2,3],[1,2,3])).toBe(true);
    

})