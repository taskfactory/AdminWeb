import {
  Table,
  Tooltip,
  Button,
  Drawer,
  Form,
  Input,
  Row,
  Col,
  Card,
  Divider,
} from "antd";
import { useEffect, useState } from "react";
import { GetSources } from "../../request/sources/sources";
import { UpsertSource } from "../../request/sources/sources";

const SourcePage = () => {
  /** 表格配置 */
  const columns = [
    {
      title: "SID",
      dataIndex: "sid",
      render: (sid) => `${sid}`,
    },
    {
      title: "数据源名称",
      dataIndex: "sname",
      render: (sname, record) => (
        <Tooltip placement="topLeft" title={record.desc}>
          {sname}
        </Tooltip>
      ),
    },
    {
      title: "生效中的配置版本",
      dataIndex: "confver",
      align: "center",
      render: (confVer) => `${confVer}`,
    },
    {
      title: "创建时间",
      align: "center",
      dataIndex: "createdAt",
    },
    {
      title: "更新时间",
      align: "center",
      dataIndex: "updatedAt",
    },
    {
      title: "操作",
      align: "center",
      dataIndex: "id",
      render: (id, record) => (
        <>
          <Button
            type="primary"
            onClick={() => {
              openEditor(record);
            }}
          >
            编辑
          </Button>
          <Button type="primary">配置</Button>
        </>
      ),
    },
  ];
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [tableParams, setTableParams] = useState({
    pagination: {
      current: 1,
      pageSize: 10,
      pageSizeOptions: [10, 20, 50],
      showSizeChanger: true,
      showQuickJumper: true,
    },
    refreshOnEditor: 0,
    query: {},
  });

  // 异步获取数据
  const fetchData = (params) => {
    setLoading(true);
    GetSources(
      params.pagination.current,
      params.pagination.pageSize,
      params.query?.sname
    )
      .then((ret) => {
        const rsp = ret.data;
        if (rsp.code !== 0) {
          throw { ...rsp };
        }
        setData(rsp.data.sources);
        setTableParams({
          ...params,
          pagination: {
            ...params.pagination,
            total: rsp.data.total,
          },
        });
        setLoading(false);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  useEffect(() => {
    fetchData(tableParams);
  }, [JSON.stringify(tableParams)]);
  const handleTableChange = (pagination, filters, sorter) => {
    setTableParams({
      pagination,
      filters,
      ...sorter,
    });
  };

  /** 数据源编辑 */
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [editorForm] = Form.useForm();
  const onEditorClose = () => {
    setIsEditorOpen(false);
  };
  const openEditor = (source) => {
    setIsEditorOpen(true);
    editorForm.setFieldsValue({ ...source });
  };
  const onEditorSubmit = (source) => {
    UpsertSource(source.sname, source.desc, source.id)
      .then((rsp) => {
        if (rsp.data.code !== 0) {
          throw { ...rsp.data };
        }
        setTableParams({
          ...tableParams,
          refreshOnEditor: tableParams.refreshOnEditor + 1,
        });
        setIsEditorOpen(false);
        editorForm.resetFields();
      })
      .catch((e) => {
        console.log(e);
      });
  };

  /** 查询相关 */
  const [searchForm] = Form.useForm();
  const onSearch = (source) => {
    setTableParams({ ...tableParams, query: { sname: source.sname } });
  };

  return (
    <>
      <Card title="检索">
        <Form
          onFinish={onSearch}
          form={searchForm}
          labelCol={{ span: 3 }}
          wrapperCol={{ span: 5 }}
        >
          <Form.Item name={"sname"} label="数据源">
            <Input />
          </Form.Item>
          <Divider dashed />
          <Row>
            <Col span={24} style={{ textAlign: "right" }}>
              <Button type="primary" htmlType="submit">
                查询
              </Button>
            </Col>
          </Row>
        </Form>
      </Card>
      <Card
        title="数据源信息"
        extra={<Button onClick={() => openEditor({})} type="primary">新增</Button>}
      >
        <Table
          columns={columns}
          rowKey={(record) => record.sid}
          dataSource={data}
          pagination={tableParams.pagination}
          loading={loading}
          onChange={handleTableChange}
        />
      </Card>
      <Drawer
        title="编辑/新增数据源"
        placement="right"
        onClose={onEditorClose}
        open={isEditorOpen}
        width={500}
      >
        <Form
          onFinish={onEditorSubmit}
          form={editorForm}
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 18 }}
        >
          <Form.Item name={"id"} label="id" hidden>
            <Input disabled={true} hidden />
          </Form.Item>
          <Form.Item name={"sid"} label="SID">
            <Input disabled={true} />
          </Form.Item>
          <Form.Item name={"sname"} label="数据源" required>
            <Input required />
          </Form.Item>
          <Form.Item name={"desc"} label="数据源描述">
            <Input.TextArea autoSize={{ minRows: 5, maxRows: 50 }} />
          </Form.Item>
          <Row>
            <Col span={24} style={{ textAlign: "right" }}>
              <Button type="primary" htmlType="submit">
                提交
              </Button>
            </Col>
          </Row>
        </Form>
      </Drawer>
    </>
  );
};

export default SourcePage;
