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

const checkFlags = async () => {
    try {
        // grabs the value from the button for entering flag1
        flag1_id = document.getElementById("flag1-input-text")
        flag1 = flag1_id.value
        // flag2
        // flag3 = 

        // note: "document.domain" gets the current url domain ex: document.domain = localhost
        // note: "location.port || 80" means if the port is not a custom on line 3000 which is used during 
        // development, 80 is used as a default and the cool part is
        // i don't have to replace ":" because port 80 is used for every website and can be used with things like
        // google.com:80
        
        //Server url is the endpoint  that the sever uses to check if the user has one the prize
        // example (running locally) : http://localhost:80/check/?flag1=333&flag2=0&flag3=0
        server_url = `http://${document.domain}:${ location.port || 80 }/check/?flag1=${flag1}&flag2=0&flag3=0`

        result = await fetch(server_url);
        // the await here is so i can print the result
        json_result = await result.json();
        console.log(json_result)
        console.log(server_url)
        console.log(flag1)

    
        // change the ui to reflect the update

        // if the guess was correct change the color of the input box to be
        // green if false red
        if(json_result.flag1 == true){
            console.log("Flag 1 is true!")
            flag1_id.style = "background: green;";
        }else if(json_result.flag1 == false){
            flag1_id.style = "background: red;";
        }

    } catch (e) {
        console.log(`Error:${e}`)
    }
}