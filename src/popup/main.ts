import { createApp } from 'vue';
// 引入antd-vue
import {
  Button,
  Form,
  Switch,
  Divider,
  InputNumber,
  Radio,
  Slider,
  Row,
  Col,
} from 'ant-design-vue';
import App from './components/App.vue';

const app = createApp(App);

app.use(Button)
  .use(Form)
  .use(Switch)
  .use(Divider)
  .use(InputNumber)
  .use(Radio)
  .use(Slider)
  .use(Row)
  .use(Col);

app.mount('#app');
