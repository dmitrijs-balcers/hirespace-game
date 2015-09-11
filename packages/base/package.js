var packages = {
    common: [
        'meteor-platform',
        'iron:router@1.0.9',
        'semantic:ui-css@2.1.2',
        'mrt:jquery-ui',
        'reactive-var'
    ]
};

Package.onUse(function (api) {
    api.imply(packages.common);
});