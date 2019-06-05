import fs = require('fs');
import path = require('path');
import { toast } from './toast';
const upperCamelCase = require('uppercamelcase');
/**
 * 创建react component
 * @param name 组件名称
 * @param path 组件路径
 */
export const createIndex = (name: string, dirPath: string) => {
  const componentPath = path.resolve(dirPath, 'index.js');
  const componentName = upperCamelCase(name);
  const wrapClassName = name.toLowerCase() + '-wrap';
  const str =
`import React from 'react';
import { page } from '@alipay/page-wrapper';
import { Page } from '@alipay/kb-biz-components';

import { indexType } from './prop-type';
import store from './store';
import spmConfig from './spm.config';
import './style.less';

@page({ store, spmConfig })
class Index extends React.PureComponent {
  static propTypes = indexType;

  componentDidMount() {
    // TODO 获取数据
    this.props.dispatch({ type: 'getData' });
  }

  render() {
    const breadcrumb = [
      { title: '面包屑Title' },
    ];

    return (
      <Page id="${componentName.substr(0, 1).toLocaleLowerCase()}${componentName.substr(1)}" breadcrumb={breadcrumb}>
        <div>
          <span>this is ${componentName} page.</span>
        </div>
      </Page>
    );
  }
}

export default Index;
`
  fs.writeFileSync(componentPath, str);
  toast.success(`index 创建成功`);
}
