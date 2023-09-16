/*
 * :file description:
 * :name: /sales/src/pages/banner/index.tsx
 * :author: 张德志
 * :copyright: (c) 2023, Tungee
 * :date created: 2023-09-09 14:24:05
 * :last editor: 张德志
 * :date last edited: 2023-09-16 22:38:10
 */
import moment from 'moment';
import _ from 'lodash';
import React, { useRef, useState, useEffect } from 'react';
import { Button, Table, Divider, Popconfirm, message, Image, Badge } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import Filter from './components/Filter';
import { empty, format } from '@/utils/index';
import { DEFAULT_PAGE_INDEX, DEFAULT_PAGE_SIZE, RESPONSE_CODE, FALLBACK } from '@/constants';
import { OPERATION_TYPE, DEFAULT_PAGINATION, WEBSITE_TYPE, STATUS_TYPE } from './constants';
import { getBannerList, getWebsiteDelete } from './service';
import type { TablePaginationConfig } from 'antd/lib/table/Table';
import WebsiteDrawer from './components/WebsiteDrawer';
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
    const res = await getBannerList(params);
    if (res.code === RESPONSE_CODE) {
      const { data } = res || {};
      setDataSource(data);
      setLoading(false);
    }
  };

  // const transformToParamsDefault = (params: any, pageIndex?: number, pageSize?: number) => {
  //   const obj = {};
  //   for (let key in params) {
  //     obj[key] = undefined;
  //   }
  //   return {
  //     pageIndex: pageIndex || PAGE_INDEX,
  //     pageSize: pageSize || PAGE_SIZE,
  //     filter: obj,
  //   };
  // };

  // const handleConfirm = async (id: string) => {
  //   const res = await getWebsiteDelete({ _id: id });
  //   if (res.stat) {
  //     message.success(res.msg);
  //     fetchWebsiteList(transformToParamsDefault(filter));
  //   }
  // };

  // const handleSubmit = () => {
  //   fetchWebsiteList({ filter, pageIndex: PAGE_INDEX, pageSize: PAGE_SIZE });
  // };

  // const handleReset = () => {
  //   const newFilter = transformToParamsDefault(filter);
  //   setFilter(newFilter);
  //   fetchWebsiteList(newFilter);
  // };

  const handleChange = (key: string, value: string) => {
    const newFilter = _.cloneDeep(filter);
    if (key === 'title') {
      newFilter[key] = value ? value : undefined;
    } else {
      newFilter[key] = value;
    }
    console.log('newFilter', newFilter);
    setFilter(newFilter);
  };

  // const handlePageChange = (pageIndex: number, pageSize: number) => {
  //   setPagination({
  //     ...pagination,
  //     current: pageIndex,
  //     pageSize,
  //   });
  //   fetchWebsiteList({ filter, pageIndex, pageSize });
  // };

  // const handleSuccess = () => {
  //   setFilter(transformToParamsDefault(filter));
  //   setPagination({
  //     ...pagination,
  //     current: 1,
  //     pageSize: 10,
  //   });
  //   fetchWebsiteList(transformToParamsDefault(filter));
  // };

  useEffect(() => {
    fetchBannerList();
  }, []);

  // useEffect(() => {
  //   fetchWebsiteList(transformToParamsDefault(filter));
  // }, []);

  const columns: ColumnsType<Banner.BannerType> = [
    {
      title: '标题',
      dataIndex: 'title',
      key: 'title',
      width: '10%',
      render: (text) => <a>{text || '--'}</a>,
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
      title: '类型',
      dataIndex: 'type',
      width: '8%',
      key: 'type',
      render: (text) => {
        const typeItem = WEBSITE_TYPE.find((item) => item.value === text);
        return <span>{typeItem?.label || empty()} </span>;
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
              onClick={() => (ref.current as any).show(OPERATION_TYPE.EDIT, record)}
            >
              编辑
            </a>
            <Divider type="vertical" />
            <Popconfirm
              okText="确定"
              placement="topLeft"
              title={'您确定要删除吗？'}
              // onConfirm={() => handleConfirm(record._id)}
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
      <div className={styles.filter}>
        {/* <Filter filter={filter} onReset={handleReset} onOk={handleSubmit} onChange={handleChange} /> */}
      </div>
      <div className={styles.content}>
        {/* <div className={styles.operation}>
          <div className={styles.left}>
            共有
            <span>&nbsp;{responseData?.total || 0}&nbsp;</span>个网站
          </div>
          <Button type="primary" onClick={() => (ref.current as any).show(OPERATION_TYPE.ADD)}>
            新增广告
          </Button>
        </div> */}
        <Table
          // pagination={{
          //   ...pagination,
          //   onChange: handlePageChange,
          //   total: responseData?.total,
          // }}
          loading={loading}
          columns={columns}
          dataSource={dataSource}
        />
      </div>
      {/* <WebsiteDrawer
        onSuccess={handleSuccess}
        //@ts-ignore
        ref={ref}
      /> */}
    </div>
  );
};

export default Website;