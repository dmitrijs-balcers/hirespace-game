Template.meet_the_team_layout.onCreated(function () {
    this.venue = new ReactiveVar();
    this.correctCount = new ReactiveVar(0);
    this.incorrectCount = new ReactiveVar(0);
    this.disabled = new ReactiveVar(false);
    this.timer = new ReactiveVar('');

    var self = this;

    MongoApiClient.call('Venues_getVenue', function (e, venue) {
        console.log('venue');
        self.venue.set(venue);
    });

    self.autorun(function () {
        console.log(self.correctCount.get());
    });
});

Template.meet_the_team_layout.onRendered(function () {

    var self = this;

    function startTimer(duration) {
        var timer = duration, minutes, seconds;
        setInterval(function () {
            minutes = parseInt(timer / 60, 10)
            seconds = parseInt(timer % 60, 10);

            minutes = minutes < 10 ? "0" + minutes : minutes;
            seconds = seconds < 10 ? "0" + seconds : seconds;

            self.timer.set(minutes + " : " + seconds);

            if (--timer < 0) {
                timer = duration;
            }
        }, 1000);
    }

    startTimer(60);
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

    incorrectCount: function () {
        return Template.instance().incorrectCount.get();
    },

    disabled: function () {
        return Template.instance().disabled.get() ? 'disabled' : '';
    },

    timer: function () {
        return Template.instance().timer.get();
    }
});

Template.meet_the_team_layout.events({
    'click #partner': function (e, t) {

        var correctCount = t.correctCount.get();
        var incorrectCount = t.incorrectCount.get();
        var disabled = t.disabled.get();

        if (!disabled && t.venue.get().partner) {
            t.disabled.set(true);
            t.correctCount.set(correctCount + 1);

            MongoApiClient.call('Venues_getVenue', function (e, venue) {
                t.disabled.set(false);
                t.venue.set(venue);
            });
        } else if (!t.venue.get().partner) {
            t.incorrectCount.set(incorrectCount + 1);
        }
    },

    'click #promoted': function (e, t) {

        var correctCount = t.correctCount.get();
        var incorrectCount = t.incorrectCount.get();
        var disabled = t.disabled.get();

        if (!disabled && t.venue.get().promoted) {
            t.disabled.set(true);
            t.correctCount.set(correctCount + 1);

            MongoApiClient.call('Venues_getVenue', function (e, venue) {
                t.disabled.set(false);
                t.venue.set(venue);
            });
        } else if (!t.venue.get().promoted) {
            t.incorrectCount.set(incorrectCount + 1);
        }
    }
});