/**
 * title: 列表页+表单使用示例
 * desc: |
 *        适用于列表页面有新建、编辑、查看交互（打开此 demo 会找不到 edit.tsx）<br/>
 *        此 demo 仅为了实现跳转
 */

import React from 'react';
import { Link } from 'umi';

import { BrowserRouter as Router, useLocation, useHistory } from 'react-router-dom';

import Edit from './edit';

export default function QueryParamsExample() {
  return (
    <Router>
      <QueryParamsDemo />
    </Router>
  );
}

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function QueryParamsDemo() {
  const query = useQuery();

  const match = { params: { type: query.get('type'), id: query.get('id') } };

  const hash = useLocation().hash.split('?')[0];
  return (
    <div>
      {match.params.type ? (
        <Child match={match} />
      ) : (
        <div>
          <h2>列表</h2>
          <ul>
            <li>
              <Link to={`${hash}?type=create`}>新建</Link>
            </li>
            <li>
              <Link to={`${hash}?type=view&id=1`}>查看</Link>
            </li>
            <li>
              <Link to={`${hash}?type=edit&id=1`}>编辑</Link>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}

function Child({ match }: any) {
  return <Edit match={match} history={useHistory()} location={useLocation()} />;
}
