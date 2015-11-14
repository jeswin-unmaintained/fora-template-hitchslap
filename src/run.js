import "babel-polyfill";

import isotropy from "isotropy";
import hitchslap from "./index";

isotropy(hitchslap, __dirname, 8080).then(function() { console.log("Listening on 8080") }, function(err) { console.log(err); });
