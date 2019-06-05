import fs = require("fs");
import path = require("path");
import { toast } from './toast';

// 创建 components 文件夹
export const createComponentsDir = (
  dirPath: string,
) => {
  const testDirPath = path.resolve(dirPath, 'components');
  fs.mkdirSync(testDirPath);
  toast.success(`components 创建成功`);
};
