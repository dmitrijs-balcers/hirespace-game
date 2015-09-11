Meteor.methods({
    'Users_createUser': function (name) {

        console.log('Users_createUser', {name: name});

        Users.insert({name: name, timestamp: new Date()})
    }
});