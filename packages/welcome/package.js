Package.onUse(function (api) {

    api.use('base');

    api.addFiles([
        'layout.html',
        'layout.js'
    ], 'client');
    api.addFiles(['router.js']);
});