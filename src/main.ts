import { ProjectorMixin } from '@dojo/framework/widget-core/mixins/Projector';
import { Registry } from '@dojo/framework/widget-core/Registry';
import App from './widgets/App';

const registry = new Registry();


const Projector = ProjectorMixin(App);
const projector = new Projector();
projector.setProperties({ registry });

const root = document.getElementById('app') || undefined;

projector.append(root);
