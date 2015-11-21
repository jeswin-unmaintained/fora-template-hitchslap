class User extends Object {}
class Template extends Object {}

// Mock data
const users = ["Jeswin", "Anup", "Raghu"].map((name, i) => {
    const user = new User();
    user.id = `${i}`;
    user.name = name;
    return user;
});

const templates = ['alpha', 'beta', 'gamma'].map((name, i) => {
    const template = new Template();
    template.id = `${i}`;
    template.name = name;
    return template;
});

const firstOrDefault = (arr) {
    return array.length > 0 ? array[0] : null;
}

module.exports = {
    getUser: (id) => firstOrDefault(users.filter((u) => u.id === id)),
    getTemplate: (id) => firstOrDefault(templates.filter((u) => u.id === id)),
    getUsers: () => users,
    gettemplates: () => templates
};
