import fs = require('fs');
import path = require('path');
import { toast } from './toast';

/**
 * 创建css文件
 * @param dirPath 路径
 */
export const createSpmConfig = (dirPath: string) => {
  const scssPath = path.resolve(dirPath, 'spm.config.js');
  const str = `const config = [];

export default config;
`;
  fs.writeFileSync(scssPath, str);
  toast.success(`spm.config 创建成功`);
}
