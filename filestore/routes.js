import store from "./store";

export default {
    { method: "GET", url: "filestore", handler: store.getAll }
};
