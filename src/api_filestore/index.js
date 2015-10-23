import store from "./store";

export default {
    routes: [
        { method: "GET", url: "filestore", handler: store.getAll }
    ]
};
