import ui_react from "./ui_react";
import api_graphql from "./api_graphql";
import api_filestore from "./api_filestore";
import api_provisioning from "./api_provisioning";
/*
    You can write the export as
        { ui_react, api_graphql, filetore }

    A module named 'static' defaults to type "static".
    A module named 'ui_react' defaults to type "ui_react".
    A module named 'api_graphql' defaults to type "api_graphql".
    Other modules defaults to type "service".

    The 'static' module defaults to path "/static".
    The 'ui_react' module defaults to path "/".
    The 'api_graphql' module defaults to path "/graphql".
    Other modules are hosted at /module-name

    Domain and port defaults to "auto".
    This means that the system will assign a port based on rules.
*/
export default {
    ui_react: { module: ui_react, path: "/", type: "ui_react" },
    api_graphql: { module: api_graphql, path: "/graphql", type: "api_graphql" },
    api_provisioning: { module: api_provisioning, path: "/provisioning", type: "service" },
    api_filestore: { module: api_filestore, path: "/filestore", type: "service" }
};
