import {Tabs} from './Tabs';
import {Runtime} from './Runtime';
export class Chrome {
    runtime: Runtime = new Runtime;
    tabs: Tabs = new Tabs(this);
    constructor(manifest?) {

    }
}