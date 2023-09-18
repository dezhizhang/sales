/*
 * :file description:
 * :name: /sales/src/pages/banner/index.tsx
 * :author: 张德志
 * :copyright: (c) 2023, Tungee
 * :date created: 2023-09-09 14:24:05
 * :last editor: 张德志
 * :date last edited: 2023-09-18 09:24:14
 */
import moment from 'moment';
import _ from 'lodash';
import React, { useRef, useState, useEffect } from 'react';
import { Button, Table, Divider, Popconfirm, message, Image, Badge } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { empty, format } from '@/utils/index';
import { transformToParams } from '@/utils';
import { RESPONSE_CODE, FALLBACK, DEFAULT_PAGE_INDEX } from '@/constants';
import { OPERATION_TYPE, DEFAULT_PAGINATION, STATUS_TYPE } from './constants';
import { getBannerList, deleteBanner } from './service';
import type { TablePaginationConfig } from 'antd/lib/table/Table';
import BannerDrawer from './components/BannerDrawer';
import styles from './index.less';

const Website: React.FC = () => {
  const ref = useRef();
  const [loading, setLoading] = useState<boolean>(true);
  const [dataSource, setDataSource] = useState<Banner.BannerType[]>([]);
  const [pagination, setPagination] = useState<TablePaginationConfig>(DEFAULT_PAGINATION);
  const [filter, setFilter] = useState<Website.RequestType>({
    title: undefined,
    type: undefined,
    status: undefined,
  });

  const fetchBannerList = async (params?: any) => {
    setLoading(true);
    const res = await getBannerList(params);
    if (res.code === RESPONSE_CODE) {
      const { data, total } = res || {};
      setDataSource(data);
      setPagination((old) => {
        return {
          ...old,
          total,
        };
      });
      setLoading(false);
    }
  };

  const handleConfirm = async (deleteId: string) => {
    const res = await deleteBanner({ id: deleteId });
    if (res.code === RESPONSE_CODE) {
      message.success(res.msg);
      fetchBannerList(transformToParams(filter));
    }
  };

  const handlePageChange = (current: number, pageSize: number) => {
    if (pageSize != pagination.pageSize) {
      setPagination((old) => {
        return { ...old, current: DEFAULT_PAGE_INDEX, pageSize };
      });
      fetchBannerList(transformToParams({ pageIndex: DEFAULT_PAGE_INDEX, pageSize }));
      return;
    }
    setPagination((old) => {
      return { ...old, current: current, pageSize };
    });
    fetchBannerList(transformToParams({ pageIndex: current, pageSize }));
  };

  const handleSuccess = () => {
    setFilter(transformToParams(filter));
    setPagination({
      ...pagination,
      current: 1,
      pageSize: 10,
    });
    fetchBannerList(transformToParams(filter));
  };

  useEffect(() => {
    fetchBannerList(transformToParams());
  }, []);

  const columns: ColumnsType<Banner.BannerType> = [
    {
      title: '名称',
      dataIndex: 'name',
      key: 'name',
      width: '10%',
      render: (text) => <span>{text || '--'}</span>,
    },
    {
      title: '链接',
      dataIndex: 'link',
      key: 'link',
      width: '16%',
      render: (text) => {
        return (
          <a href={`//${text}`} target="_blank">
            {text}
          </a>
        );
      },
    },
    {
      title: '封面',
      dataIndex: 'url',
      key: 'url',
      width: '10%',
      render: (text) => {
        return <Image width={64} height={32} src={text} fallback={FALLBACK} />;
      },
    },
    {
      title: '描述',
      key: 'description',
      width: '16%',
      dataIndex: 'description',
      render: (text) => {
        return <span>{text || empty()}</span>;
      },
    },
    {
      title: '创建时间',
      key: 'add_time',
      width: '20%',
      dataIndex: 'add_time',
      render: (text) => {
        return <span>{moment(text).format(format()) || empty()}</span>;
      },
    },
    {
      title: '状态',
      key: 'status',
      width: '10%',
      dataIndex: 'status',
      render: (text) => {
        const statusItem = STATUS_TYPE.find((item) => item.value === text);
        return (
          <span>
            {statusItem ? (
              <Badge
                text={statusItem.label}
                color={statusItem.value === 'enable' ? 'green' : 'volcano'}
              />
            ) : (
              empty()
            )}
          </span>
        );
      },
    },
    {
      title: '操作',
      key: 'operation',
      width: '10%',
      render: (_, record: Banner.BannerType) => {
        return (
          <div>
            <a
              type="primary"
              role="button"
              onClick={() => (ref.current as any).show(OPERATION_TYPE.EDITOR, record)}
            >
              编辑
            </a>
            <Divider type="vertical" />
            <Popconfirm
              okText="确定"
              placement="topLeft"
              title={'您确定要删除吗？'}
              onConfirm={() => handleConfirm(record?.id)}
              cancelText="取消"
            >
              <a type="primary" role="button">
                删除
              </a>
            </Popconfirm>
          </div>
        );
      },
    },
  ];

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.operation}>
          <div className={styles.left}>
            共有
            <span>&nbsp;{pagination?.total || 0}&nbsp;</span>个轮播图
          </div>
          <Button type="primary" onClick={() => (ref.current as any).show(OPERATION_TYPE.CREATE)}>
            新增轮播图
          </Button>
        </div>
        <Table
          pagination={{
            ...pagination,
            onChange: handlePageChange,
          }}
          loading={loading}
          columns={columns}
          dataSource={dataSource}
        />
      </div>
      <BannerDrawer
        onSuccess={handleSuccess}
        //@ts-ignore
        ref={ref}
      />
    </div>
  );
};

export default Website;
