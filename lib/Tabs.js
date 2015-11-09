var Tab_1 = require('./Tab');
var Tabs = (function () {
    function Tabs(chrome) {
        var _this = this;
        this.chrome = chrome;
        this.tabs = [];
        this.currentId = 0;
        this.create = jest.genMockFunction().mockImplementation(function (props, cb) {
            _this.chrome.runtime.lastError = undefined;
            var tab = new Tab_1.Tab(props);
            tab.id = _this.currentId++;
            _this.tabs.push(tab);
            if (_this.contentScript) {
                try {
                    if (typeof (_this.contentScript) === 'string') {
                        (function (window) { return eval(_this.contentScript); })(tab.window);
                    }
                    else {
                        (function (window) {
                            return _this.contentScript(window);
                        })(tab.window);
                    }
                }
                catch (e) {
                    _this.chrome.runtime.lastError = e;
                    cb();
                }
            }
            cb(tab);
        });
        this.remove = jest.genMockFunction().mockImplementation(function (ids, cb) {
            _this.chrome.runtime.lastError = undefined;
            if (Object.prototype.toString.call(ids) === '[object Array]') {
                for (var i = 0; i < ids.length; i++) {
                    _this.removeOne(ids[i]);
                }
            }
            else {
                _this.removeOne(ids);
            }
            cb();
        });
        this.get = jest.genMockFunction().mockImplementation(function (tabId, callback) {
            _this.chrome.runtime.lastError = undefined;
            callback(_this.tabs.filter(function (tab) { return tab.id == tabId; })[0]);
        });
        this.executeScript = jest.genMockFunction().mockImplementation(function (tabId, details, cb) {
            _this.chrome.runtime.lastError = undefined;
            _this.get(tabId, function (tab) {
                if (details.code) {
                    try {
                        var result = (function (window) {
                            return eval(details.code);
                        })(tab.window);
                        cb([result]);
                    }
                    catch (e) {
                        _this.chrome.runtime.lastError = e;
                        cb();
                    }
                }
            });
        });
    }
    Tabs.prototype.setContentScript = function (code) {
        this.contentScript = code;
    };
    Tabs.prototype.removeOne = function (id) {
        var index;
        if (this.tabs.some(function (tab, index_) {
            if (tab.id === id) {
                index = index_;
                return true;
            }
        })) {
            this.tabs.splice(index, 1);
        }
        else {
            throw new Error("Invalid tab id " + id);
        }
    };
    return Tabs;
})();
exports.Tabs = Tabs;
