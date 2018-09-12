import { WidgetBase } from '@dojo/framework/widget-core/WidgetBase';
import { v } from '@dojo/framework/widget-core/d';

export class AppBase extends WidgetBase {
    protected render() {
        return v('div', {}, ['client.api']);
    }
}

export default class App extends AppBase { }