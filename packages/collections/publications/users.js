Meteor.publish('Users_find', function () {
    return Users.find();
});