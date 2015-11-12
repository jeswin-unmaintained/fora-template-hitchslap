import ui_react from "./ui_react";
import api_graphql from "./api_graphql";
import api_filestore from "./api_filestore";
import api_provisioning from "./api_provisioning";
import _static from "./static"

export default {
    ui_react: { module: ui_react, path: "/" },
    api_graphql: { module: api_graphql, path: "/graphql" },
    api_provisioning: { module: api_provisioning, path: "/provisioning" },
    api_filestore: { module: api_filestore, path: "/filestore" },
    static: { module: _static, path: "/static" }
};
