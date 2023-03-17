import {
    FolderFilled
} from '@ant-design/icons';
import { SourcePage } from './pages';
import ErrorPage from './pages/errorPage';

function buildConfig(path, elem, label, icon, children) {
    return {
        label: label,
        element: elem,
        path: path,
        icon: icon,
        children: children ? children : [],
    };
}

const ConfigItems = [
    buildConfig("source", <SourcePage />, "来源管理", <FolderFilled />),
    buildConfig("test", <ErrorPage />, "Test", <FolderFilled />),
    buildConfig("user", <ErrorPage />, "User", <FolderFilled />, [
        buildConfig("tom", <ErrorPage />, "Tom"),
        buildConfig("bill", <ErrorPage />, "Bill"),
        buildConfig("frank", <ErrorPage />, "Frank"),
    ])
];

export default ConfigItems;