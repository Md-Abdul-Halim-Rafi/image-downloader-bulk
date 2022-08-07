const fs = require("fs");
const { default: axios } = require("axios");

const safeMimeTypes = ["jpg", "jpeg", "png", "gif", "webp", "svg"];

const startDownload = async () => {

    try {

        let images = fs.readFileSync("./data.csv", "utf8");
        
        images = images.split(/\r?\n/);

        for (let i = 1; i < images.length; i++) {
            
            const image = images[i].split(",");
            const name = image[0].split(" ").join("-").toLocaleLowerCase();
            const url = image[1];

            if (i < 275) continue;

            if (name && url) {

                let mimetype = url.split(".").pop();

                if (!safeMimeTypes.includes(mimetype)) {
                    mimetype = "jpeg";
                }

                try {

                    const { data } = await axios.get(
                        url,
                        { responseType: "arraybuffer" }
                    );
    
                    const filename = `./images/${name}.${mimetype}`;
    
                    fs.writeFileSync(filename, data);
    
                    console.log(`${i} => ${filename}`);

                } catch (err) {
                    console.error(`Error for: ${i}`);
                    continue;
                }
            }
        }
        
        console.log("DONE!!!");

    } catch (err) {
        console.error(err);
    }
}

startDownload();