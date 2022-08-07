const fs = require("fs");
const { default: axios } = require("axios");

const startDownload = async () => {

    try {

        const { data } = await axios.get(
            "https://turtles-cdn.s3-ap-southeast-1.amazonaws.com/Foodie-Goodie-5039/timeline/avatar-c5b080aa.jpeg",
            { responseType: "arraybuffer" }
        );
        
        fs.writeFileSync("./test.jpeg", data);

        console.log("DONE!!!");

    } catch (err) {
        
        console.error(err.response);
    }
}

startDownload();