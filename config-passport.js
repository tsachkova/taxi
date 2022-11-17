const passport = require('passport');
const localStrategy = require('passport-local').Strategy;

const authUser = [
    {
        id: 1,
        username: 'vasya',
        password: 'qqq'
    },

    {
        id: 2,
        username: 'vasya1',
        password: 'qqq1'
    },
];

passport.serializeUser(function (user, done) {
    done(null, user.id);
})

passport.deserializeUser(function (id, done) {
    let user = false;
    for (let i = 0; i < authUser; i++) {

        if (authUser[i].id === id) {
            user = authUser[i].id;
            break;
        }
    }
    done(null, user);
})

passport.use(
    new localStrategy({ usernameField: 'username' }, function (user, password, done) {
        for (let i = 0; i < authUser.length; i++) {

            if (user === authUser[i].username && password === authUser[i].password) {
                return done(null, authUser[i]);
            }
        }

        return done(null, false)
    })
)