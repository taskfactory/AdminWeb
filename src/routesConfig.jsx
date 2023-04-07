import {
    FolderFilled
} from '@ant-design/icons';
import { SourcePage } from './pages';
import ErrorPage from './pages/errorPage';

function buildConfig(path, elem, label, showInMenu, icon, children) {
    return {
        label: label,
        element: elem,
        path: path,
        icon: icon,
        children: children ? children : [],
        showInMenu: showInMenu === true ? true : false,
    };
}

const ConfigItems = [
    buildConfig("source", <SourcePage />, "来源管理", true, <FolderFilled />),
    buildConfig("test", <ErrorPage />, "Test", true, <FolderFilled />),
    buildConfig("user", <ErrorPage />, "User", true, <FolderFilled />, [
        buildConfig("tom", <ErrorPage />, "Tom", true),
        buildConfig("bill", <ErrorPage />, "Bill", true),
        buildConfig("frank", <ErrorPage />, "Frank", true),
    ])
];

export default ConfigItems;