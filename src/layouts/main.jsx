import { Menu, Layout, theme, Typography } from 'antd';
import { useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import {RouterItems} from '../config.jsx';

const { Header, Content, Footer, Sider } = Layout;

const { Title } = Typography;

const MainLayout = () => {
    const [collapsed, setCollapsed] = useState(false);
    const {
        token: { colorBgContainer },
    } = theme.useToken();

    const { SubMenu } = Menu;
    return (
        <Layout
            style={{
                minHeight: '100vh',
            }}
        >
            <Sider
                collapsible
                collapsed={collapsed}
                onCollapse={(value) => setCollapsed(value)}>
                <Title level={2} style={{
                    textAlign: 'center',
                    color: "White"
                }}><Link to="/">AW</Link></Title>
                <Menu
                    theme={"dark"}
                    defaultSelectedKeys={['source']}
                    mode="inline">
                    {RouterItems.map((item, idx) => {
                        if (item?.children?.length > 0) {
                            const children = item.children.map((child, childIdx) => {
                                return (
                                    <Menu.Item key={idx * 1000 + childIdx + 1}>
                                        <Link to={"/" + item.path + "/" + child.path}>{child.label}</Link>
                                    </Menu.Item>
                                );
                            })
                            return (
                                <SubMenu key={idx * 1000} icon={item?.icon} title={item.label}>
                                    {children}
                                </SubMenu>
                            )
                        } else {
                            return (
                                <Menu.Item key={idx * 1000} icon={item?.icon}>
                                    <Link to={"/" + item.path}>{item.label}</Link>
                                </Menu.Item>
                            );
                        }
                    })}
                </Menu>
            </Sider>
            <Layout className="site-layout">
                <Header
                    style={{
                        padding: 0,
                        background: colorBgContainer,
                    }}
                />
                <Content
                    style={{
                        margin: '0 16px',
                    }}
                >
                    <Outlet />
                </Content>
                <Footer
                    style={{
                        textAlign: 'center',
                    }}
                >
                    TaskFactory ©2023
                </Footer>
            </Layout>
        </Layout>
    );
};
export default MainLayout;
