Template.meet_the_team_layout.onCreated(function () {
    this.venue = new ReactiveVar();
    this.correctCount = new ReactiveVar(0);
    this.disabled = new ReactiveVar(false);

    var self = this;

    MongoApiClient.call('Venues_getVenue', function (e, venue) {
        console.log('venue');
        self.venue.set(venue);
    });

    self.autorun(function () {
        console.log(self.correctCount.get());
    });
});

Template.meet_the_team_layout.helpers({
    venue: function () {
        return Template.instance().venue.get();
    },

    image: function () {
        var venue = Template.instance().venue.get();

        console.log(venue);

        var photo = '';

        _.forEach(venue.usages, function (usage) {
            if (usage.photo && usage.photo.url) {
                photo = usage.photo.url.replace('ls-xxl', 'oc-l');
            }
        });

        return photo;
    },

    correctCount: function () {
        return Template.instance().correctCount.get();
    },

    disabled: function () {
        return Template.instance().disabled.get() ? 'disabled' : '';
    }
});

Template.meet_the_team_layout.events({
    'click #partner': function (e, t) {

        var correctCount = t.correctCount.get();
        var disabled = t.disabled.get();

        if (!disabled && t.venue.get().partner) {
            t.correctCount.set(correctCount + 1);

            MongoApiClient.call('Venues_getVenue', function (e, venue) {
                t.venue.set(venue);
            });
        }
    },

    'click #promoted': function (e, t) {

        var correctCount = t.correctCount.get();
        var disabled = t.disabled.get();

        if (!disabled && t.venue.get().promoted) {
            t.correctCount.set(correctCount + 1);

            MongoApiClient.call('Venues_getVenue', function (e, venue) {
                t.venue.set(venue);
            });
        }
    }
});