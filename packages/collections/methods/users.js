Meteor.methods({
    'Users_createUser': function (name) {

        console.log('Users_createUser', {name: name});
        var existingUser = Users.findOne({name: name}, {fields: {_id: 1}});

        if (!existingUser) {
            return Users.insert({name: name, timestamp: new Date()})
        }

        return existingUser._id;
    }
});