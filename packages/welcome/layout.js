Template.welcome_layout.events({
    'click #submit': function () {
        Meteor.call('Users_createUser', $('#name').val());
    }
});