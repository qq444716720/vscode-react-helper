import fs = require('fs');
import path = require('path');
import { toast } from './toast';
const upperCamelCase = require('uppercamelcase');
/**
 * 创建react component
 * @param name 组件名称
 * @param path 组件路径
 */
export const createPropType = (dirPath: string) => {
  const componentPath = path.resolve(dirPath, 'prop-type.js');
  const str =
`import PropTypes from 'prop-types';

const { array, func, object, string, bool } = PropTypes;

const indexType = {
  dispatch: func,
  pagination: object,
  loading: bool,
  list: array,
};

export { indexType };
`
  fs.writeFileSync(componentPath, str);
  toast.success(`prop-types 创建成功`);
}
