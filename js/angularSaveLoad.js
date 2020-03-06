// Factory for localStorage functionality
// Credit to Alessio Delmonti https://gist.github.com/Alexintosh/8e8dd716860c8fdcd08a
ARACHNEST.factory('$localstorage', ['$window',
    function ($window) {
        return {
            set: function (key, value) {
                $window.localStorage[key] = value;
            },
            get: function (key, defaultValue) {
                return $window.localStorage[key] || defaultValue || false;
            },
            setObject: function (key, value) {
                $window.localStorage[key] = JSON.stringify(value);
            },
            getObject: function (key, defaultValue) {
                if ($window.localStorage[key] != undefined) {
                    return JSON.parse($window.localStorage[key]);
                } else {
                    return false;
                }
            },
            remove: function (key) {
                $window.localStorage.removeItem(key);
            },
            clear: function () {
                $window.localStorage.clear();
            }
        }
    }
]);