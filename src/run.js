import "babel-polyfill";

import isotropy from "isotropy";
import hitchslap from "./index";

const port = process.argv.length >= 3 ? process.argv[2] : 1950;
isotropy(hitchslap, __dirname, port).then(
    function() {
        console.log(`Listening on ${port}`)
    },
    function(err) {
        console.log(err);
        if (err.stack) console.log(err.stack);
    }
);
