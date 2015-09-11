Template.welcome_layout.onCreated(function () {
    this.subscribe('Users_find');
});

Template.welcome_layout.onRendered(function () {
    $('.ui.search.dropdown')
        .dropdown({
            useLabels: false,
            maxSelections: 3,
            allowAdditions: true
        });
});

Template.welcome_layout.helpers({
    users: function () {
        return Users.find();
    }
});

Template.welcome_layout.events({
    'click #submit': function () {
        Meteor.call('Users_createUser', $('#name').val());
    }
});