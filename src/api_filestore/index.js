import store from "./store";

export default {
    routes: [
        { method: "GET", url: "hello", handler: store.getAll }
    ]
};
