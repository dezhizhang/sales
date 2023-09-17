/*
 * :file description:
 * :name: /sales/src/pages/banner/components/BannerDrawer/index.tsx
 * :author: 张德志
 * :copyright: (c) 2023, Tungee
 * :date created: 2023-09-16 22:45:12
 * :last editor: 张德志
 * :date last edited: 2023-09-17 14:55:55
 */
import OSS from 'ali-oss';
import { OSS_OBJECT, PPRODUCT_NAME, RESPONSE_CODE } from '@/constants';
import { Button, Form, Input, Drawer, Row, message, Select, Upload } from 'antd';
import { createBannerInfo, putBannerUpdate } from '../../service';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import React, { forwardRef, useState, useImperativeHandle } from 'react';
import { OPERATION_TYPE, OPERATION_TEXT, WEBSITE_TYPE, STATUS_TYPE } from '../../constants';
import styles from './index.less';

const { Option } = Select;

const { TextArea } = Input;

interface UserDrawerProps {
  onSuccess: () => void;
}

const BannerDrawer: React.FC<UserDrawerProps> = forwardRef((props, ref) => {
  const [form] = Form.useForm();
  const { onSuccess } = props;
  const [fileList, setFileList] = useState<any>([]);
  const [loading, setLoading] = useState(false);
  const [operate, setOperate] = useState<string>(OPERATION_TYPE.CREATE);

  const [visible, setVisible] = useState<boolean>();
  useImperativeHandle(ref, () => ({
    show: (active: string, record: Banner.BannerType) => {
      setVisible(true);
      if (record) {
        setFileList([
          {
            name: record.name,
            url: record.url,
            status: 'done',
          },
        ]);
        form.setFieldsValue(record);
      }
      setOperate(active);
    },
  }));

  const httpRequestHandler = async (values: any) => {
    const httpRequestMethod: any = {
      [OPERATION_TYPE.CREATE]: createBannerInfo,
      [OPERATION_TYPE.EDITOR]: putBannerUpdate,
    };
    return await httpRequestMethod[operate](values);
  };

  const handleFinish = async () => {
    await form.validateFields();
    const values = await form.getFieldsValue();
    values.url = fileList[0]?.url;
    const res = await httpRequestHandler(values);
    if (res?.code === RESPONSE_CODE) {
      setVisible(false);
      setFileList([]);
      onSuccess?.();
      message.success(`${OPERATION_TEXT[operate]}成功`);
    }
  };

  const beforeUpload = async (file: { type: string; size: number }) => {
    // 检查图片类型
    const IMAGE_TYPE = ['image/jpeg', 'image/png', 'image/bmp', 'image/webp'];

    if (!IMAGE_TYPE.includes(file.type)) {
      message.error('请上传图片');
      return false;
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('上传图片必须小于 2MB!');
      return false;
    }
    return IMAGE_TYPE.includes(file.type) && isLt2M;
  };

  const loadClient = async () => {
    return new OSS(OSS_OBJECT);
  };

  const handleRequest = async ({ file }: any) => {
    setLoading(true);
    const fileType = file.type;
    const extension = fileType?.split('/')?.[1];
    const dateTime = new Date().getTime();
    const client = await loadClient();
    const result = await client.put(`/${PPRODUCT_NAME}/bannner/${dateTime}.${extension}`, file);
    const uploadObj = {
      uid: dateTime,
      name: result?.name?.split('/')[1],
      url: result.url,
      status: 'done',
    };
    setLoading(false);
    setFileList([uploadObj]);
  };

  console.log('operate', operate);

  return (
    <Drawer
      className={styles.container}
      footer={
        <Row justify="end">
          <Button onClick={() => setVisible(false)} style={{ marginRight: 16 }}>
            取消
          </Button>
          <Button onClick={handleFinish} type="primary">
            确认
          </Button>
        </Row>
      }
      width={500}
      title={OPERATION_TEXT[operate]}
      open={visible}
      onClose={() => setVisible(false)}
    >
      <Form
        form={form}
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 20 }}
        onFinish={handleFinish}
        autoComplete="off"
      >
        <Form.Item label="标题" name="name" rules={[{ required: true, message: '标题不能为空!' }]}>
          <Input placeholder="请输入标题" />
        </Form.Item>

        <Form.Item label="链接" name="link" rules={[{ required: true, message: '链接不能为空' }]}>
          <Input placeholder="请输入链接" />
        </Form.Item>
        <Form.Item label="封面" name="url" rules={[{ required: true, message: '链接不能为空' }]}>
          <Upload
            accept="image/*"
            listType="picture"
            fileList={fileList}
            name="file"
            customRequest={handleRequest}
            onRemove={() => setFileList([])}
            beforeUpload={beforeUpload}
          >
            {fileList.length <= 0 && (
              <div className={styles.upload}>
                {loading ? <LoadingOutlined /> : <PlusOutlined />}
              </div>
            )}
          </Upload>
        </Form.Item>

        <Form.Item
          label="位置"
          name="position"
          rules={[{ required: true, message: '位置不能为空' }]}
        >
          <Select placeholder="请选择位置">
            {WEBSITE_TYPE.map((item) => (
              <Option key={item?.value} value={item.value}>
                {item.label}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item label="状态" name="status" rules={[{ required: true, message: '状态不能为空' }]}>
          <Select placeholder="请选择状态">
            {STATUS_TYPE.map((item) => (
              <Option key={item?.value} value={item.value}>
                {item.label}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item label="描述" name="description">
          <TextArea rows={4} placeholder="请输入描述最多支持200字符" maxLength={200} />
        </Form.Item>
      </Form>
    </Drawer>
  );
});

export default BannerDrawer;
