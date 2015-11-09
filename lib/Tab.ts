export class Tab {
    id: number;
    window = {};
    constructor(props: chrome.tabs.CreateProperties) {
        this.window['window'] = this.window;
    }  
}