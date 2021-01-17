// this is the front end code that allows for the user to check to see if the
// flags are correct by pressing buttons that call back to the server to see if 
// the they got it right!
// by oran collins
// github.com/wisehackermonkey
// oranbusiness@gmail.com
// 20210116


console.log("Loading main script...")

// check the servers /check/..... endpoint to see if the user intered the correct 
// flag
// checkFlags() grabs the 3 input boxes values and sends a fetch to the server

const checkAllFlags = async () => {
    try {
        // grabs the value from the button for entering flag1
        flag1_id = document.getElementById("flag1-input-text")
        flag2_id = document.getElementById("flag2-input-text")
        flag3_id = document.getElementById("flag3-input-text")
        win_text_id = document.getElementById("win_text");
        flag1 = flag1_id.value
        flag2 = flag2_id.value
        flag3 = flag3_id.value


        // note: "document.domain" gets the current url domain ex: document.domain = localhost
        // note: "location.port || 80" means if the port is not a custom on line 3000 which is used during 
        // development, 80 is used as a default and the cool part is
        // i don't have to replace ":" because port 80 is used for every website and can be used with things like
        // google.com:80

        //Server url is the endpoint  that the sever uses to check if the user has one the prize
        // example (running locally) : http://localhost:80/check/?flag1=333&flag2=0&flag3=0
        server_url = `http://${ document.domain }:${ location.port || 80 }/check/?flag1=${flag1}&flag2=${flag2}&flag3=${flag3}`

        result = await fetch(server_url);
        // the await here is so i can print the result
        json_result = await result.json();
        console.log(json_result)
        console.log(server_url)
        console.log(flag1)


        // change the ui to reflect the update

        // if the guess was correct change the color of the input box to be
        // green if false red
        if (json_result.flag1 == true) {
            flag1_id.style = "background: lightgreen";
        } else if (json_result.flag1 == false) {
            flag1_id.style = "background: LightCoral;";
        }

        if (json_result.flag2 == true) {
            flag2_id.style = "background: lightgreen";
        } else if (json_result.flag2 == false) {
            flag2_id.style = "background: LightCoral;";
        }

        if (json_result.flag3 == true) {
            flag3_id.style = "background: lightgreen";
        } else if (json_result.flag3 == false) {
            flag3_id.style = "background: LightCoral;";
        }


        if (json_result.flag1 == true && json_result.flag1 == true & json_result.flag1 == true) {
            // source for the win sound is https://freesound.org/people/Mativve/sounds/391540/
            play_win_fx();
            play_win_fx("sandermotions_applause-3.wav")
            play_win_fx("dersuperanton__congratulations-deep-voice.wav");
            

            win_text_id.innerHTML = "You won! to collect the $100 from oran please contact at oranbusiness@gmail.com"
            // make text blink! every .2 seconds
            var f = win_text_id
            id = setInterval(function() {
                f.style.display = (f.style.display == 'none' ? '' : 'none');
            }, 200);

            // top the blinking after 2 seconds
            setTimeout(()=>{  f.style.display =""; clearInterval(id)}, 1000)
            // if the
        } else if (flag1.length === 0) {
            win_text_id.innerHTML = "Please enter a guess."

        } else {
            win_text_id.innerHTML = "That wasn't correct, please try again."
            play_fail_fx();
        }

    } catch (e) {
        console.log(`Error:${e}`)
    }
}

// plays a electronic win sound effect in the browser
// source for the win sound is https://freesound.org/people/Mativve/sounds/391540/
const play_win_fx = (option)=>{
    option = option ? "/sound/"+option: ""
    sound_url = option ||"/sound/mativve_electro-success-sound.wav"
    const win_sound_fx = new Audio(sound_url)
    win_sound_fx.play();
}
// plays sound effect for failed guesses
// source https://freesound.org/people/iut_Paris8/sounds/428639/
// source https://freesound.org/people/OwlStorm/sounds/404743/
const play_fail_fx = (option) =>{
    option = option ? "/sound/"+option: ""

    sound_url = option || "/sound/owlstorm-retro-video-game-sfx-fail.wav"
     const fail_fx = new Audio(sound_url);
     // const fail_fx = new Audio("iut-paris8-quillard-charles-2018-gatecoin.wav");
     fail_fx.play();
}

// checks all 3 flag input fields dynamically by 
// <button onclick="checkFlag(3)"> Check </button>
// using hardcoded number parapter into the buttons onclick function
// checkFlag(3) = grabs flag's input and asks the server if that number ex: 1000 is correct
// server returns json with 
// {
//     is_correct: true/false,
//     error: ``
// } 
// if is_correct is false turn color of input field green indicating success
// if is_correct is false turn color of input field red indicating fail

const checkFlag = async (flag_num) => {

    flag_id = document.getElementById(`flag${flag_num}-input-text`);

    // example url http://localhost:80/check/flag2/?value=888888888888
    server_endpoint_url = `/check/flag/?value=${flag_id.value}`
    try {
        // wait for the server to respond then wait for the first promise to finish
        // thats why there is nested await await
        result = await (await fetch(server_endpoint_url)).json()


        if (result.is_correct == true) {
            flag_id.style = "background: lightgreen";
            //source of sound https://freesound.org/people/troym1/sounds/325444/
            play_win_fx("sailorerick_magical-hit.m4a"/*troym1__correct.mp3"*/);
        } else if (result.is_correct == false) {
            flag_id.style = "background: LightCoral;";
            play_fail_fx();
        }
        // Debug statements
        console.log(result)
        console.log(flag_num);
        console.log(flag_id.value)
    } catch (e) {
        console.log(`Error:${e}`)
    }
}