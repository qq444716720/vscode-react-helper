import fs = require('fs');
import path = require('path');
import { toast } from './toast';

/**
 * 创建css文件
 * @param dirPath 路径
 */
export const createLess = (name: string, dirPath: string) => {
  const scssPath = path.resolve(dirPath, 'style.less');
  const str = `#${name.substr(0, 1).toLocaleLowerCase()}${name.substr(1)}{

}
`;
  fs.writeFileSync(scssPath, str);
  toast.success(`style.less创建成功`);
}
