declare module ChromeJestMock {
    interface Chrome {
        tabs: Tabs;
        runtime: Runtime;
        browserAction: BrowserAction;
    }
    namespace Manifect {
        interface ContentScript {
            matches: Array<string>;
            js: Array<string>;
            run_at: string;
        }
        export interface Manifest {
            content_scripts: Array<ContentScript>;
        }
    }
    interface ChromeStatic {
        new (manifest?: Manifect.Manifest): Chrome;
    }
    interface BrowserAction {
        onClicked: {
            addListener: jest.Mock<any>;
        };
    }
    interface Runtime {
        id: string;
        lastError: Object;
    }
    interface Tabs {
        create: Tabs.Create;
        remove: Tabs.Remove;
        executeScript: Tabs.ExecuteScript;
        get: Tabs.Get;
        tabs: Array<Tab>;
        setContentScript(code: string);
        setContentScript(code: Function);
    }
    interface Tab {
        id: number;
        window: Object;
    }
    module Tabs {
        interface Create extends jest.Mock<any> {
            (props: chrome.tabs.CreateProperties, cb?: (tab: Tab) => any): void;
        }
        interface Remove extends jest.Mock<any> {
            (id: number, cb?: () => any): void;
        }
        interface Remove extends jest.Mock<any> {
            (ids: Array<number>, cb?: () => any): void;
        }
        interface ExecuteScript extends jest.Mock<any> {
            (tabId: number, details: chrome.tabs.InjectDetails, callback: (results:Array<any>) => any);
        }
        interface Get extends jest.Mock<any> {
            (tabId: number, callback: (tab: Tab) => any);
        }
    }
}
declare module 'chrome-jest-mock' {
    export var Chrome: ChromeJestMock.ChromeStatic;
}