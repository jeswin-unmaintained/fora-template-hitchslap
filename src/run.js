import "babel-polyfill";

import getIsotropy from "isotropy";
import koa from "koa";
import mount from "koa-mount";
import pathToRegexp from "path-to-regexp";
import hitchslap from "./index";

let isotropy = getIsotropy(koa, mount, pathToRegexp);

isotropy(hitchslap, 8080);
