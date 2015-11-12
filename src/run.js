import "babel-polyfill";

import getIsotropy from "isotropy";
import koa from "koa";
import koaMount from "koa-mount";
import koaStatic from "koa-static";
import pathToRegexp from "path-to-regexp";
import hitchslap from "./index";

let isotropy = getIsotropy({ dir: __dirname }, { koa, koaMount, koaStatic, pathToRegexp });

isotropy(hitchslap,8080).then(function() { console.log("Listening on 8080") }, function(err) { console.log(err); });
