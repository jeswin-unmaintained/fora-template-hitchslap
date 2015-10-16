import api from "./api";
import filestore from "./filestore";
import ui from "./ui";

/*
    You can write the export as
        { ui:, api, filetore }

    A module named 'ui' defaults to type "ui".
    Other modules defaults to type "service".

    The 'ui' module defaults to path "/".
    Other modules are hosted at /module-name

    Domain and port defaults to "auto".
    This means that the system will assign a port based on rules.
*/
export default {
    ui: { module: ui, domain: "auto", port: "auto", path: "/", type: "ui" },
    api: { module: api, domain: "auto", port: "auto", path: "/api", type: "service" },
    filestore: { module: filestore, domain: "auto", port: "auto", path: "/filestore", type: "service" }
};
