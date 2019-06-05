import fs = require('fs');
import path = require('path');
import { toast } from './toast';
const upperCamelCase = require('uppercamelcase');
/**
 * 创建react component
 * @param name 组件名称
 * @param path 组件路径
 */
export const createService = (dirPath: string) => {
  const componentPath = path.resolve(dirPath, 'service.js');
  const str =
`import fetch from '@alipay/kobe-fetch';

export function getData(param = { }) {
  return fetch({
    url: '',
    param,
  });
}
`
  fs.writeFileSync(componentPath, str);
  toast.success(`service 创建成功`);
}
