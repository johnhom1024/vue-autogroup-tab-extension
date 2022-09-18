import { createApp } from 'vue';
import App from './components/App.vue';
// 引入antd-vue
import { Button, Form, Switch, Divider } from 'ant-design-vue';

const app = createApp(App);

app.use(Button).use(Form).use(Switch).use(Divider);

app.mount('#app');
