//require('dotenv').config()
function sendkey() {

    const SendDataKey = 327426;
    //const SendDataKey = process.env.seckey;
    // const mySendDataKey = parseInt(SendDataKey, 10)
    // console.log(mySendDataKey);
    const secure_key = document.getElementById("secure_key").value;

    var error_show = document.getElementById("error_show");

    if (SendDataKey == secure_key) {

        async function sendtodata() {
            const website = document.getElementById("website").value;
            const user = document.getElementById("user").value;
            const password = document.getElementById("password").value;


            const Data = {
                website: `${website}`,
                user: `${user}`,
                password: `${password}`,
            };
            error_show.style.color = "Green";
            error_show.innerHTML = "Data Send Successfully";



            try {
                const response = await fetch('/send-data', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(Data)
                });

                if (response.ok) {
                    console.log('data sent successfully');
                } else {
                    console.error('Error sending data');
                }
            } catch (error) {
                console.error('Error sending data:', error);
            }


        }

        sendtodata();
    }
    else {
        error_show.style.color = "red";
        error_show.innerHTML = "Data Not Send";


    }

} 
