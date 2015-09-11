Package.onUse(function (api) {

    api.use('base');

    api.addFiles(['collections.js']);
    api.addFiles(['methods/users.js'], 'server');
    api.addFiles(['mongoApi.js']);
    api.addFiles(['publications/users.js'], 'server');

    api.export('Users');
    api.export('VenueData');
    api.export('MongoApiClient');
});