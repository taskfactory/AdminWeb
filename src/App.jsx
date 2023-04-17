import { App as AntdApp } from 'antd';
import './App.css';
import { MainLayout } from './layouts';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/es/locale/zh_CN';

function App() {
  return (
    <AntdApp>
      <ConfigProvider locale={zhCN}>
      <MainLayout />
      </ConfigProvider>
    </AntdApp>
  );
}

export default App;
