var Tabs_1 = require('./Tabs');
var Runtime_1 = require('./Runtime');
var Chrome = (function () {
    function Chrome(manifest) {
        this.runtime = new Runtime_1.Runtime;
        this.tabs = new Tabs_1.Tabs(this);
    }
    return Chrome;
})();
exports.Chrome = Chrome;
