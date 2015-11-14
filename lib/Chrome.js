var Tabs_1 = require('./Tabs');
var Runtime_1 = require('./Runtime');
var BrowserAction_1 = require('./BrowserAction');
var Chrome = (function () {
    function Chrome(manifest) {
        this.runtime = new Runtime_1.Runtime;
        this.tabs = new Tabs_1.Tabs(this);
        this.browserAction = new BrowserAction_1.BrowserAction;
    }
    return Chrome;
})();
exports.Chrome = Chrome;
