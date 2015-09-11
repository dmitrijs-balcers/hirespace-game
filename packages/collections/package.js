Package.onUse(function (api) {

    api.use('base');

    api.addFiles(['collections.js']);
    api.addFiles(['methods/users.js'], 'server');

    api.export('Users');
});