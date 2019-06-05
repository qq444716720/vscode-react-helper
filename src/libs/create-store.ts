import fs = require('fs');
import path = require('path');
import { toast } from './toast';
const upperCamelCase = require('uppercamelcase');

/**
 * 创建css文件
 * @param dirPath 路径
 */
export const createStore = (name: string, dirPath: string) => {
  const scssPath = path.resolve(dirPath, 'store.js');
  const componentName = upperCamelCase(name);
  const str = `
import { getData } from './service';

export default {
  namespace: '${componentName.substr(0, 1).toLocaleLowerCase()}${componentName.substr(1)}',

  initial: {
    loading: false,
    list: [],
    pagination: {
      pageSize: 10,
      current: 1,
      total: 0,
    },
  },

  reducers: {
    setField(state, { field, value }) {
      return {
        ...state,
        [field]: value,
      };
    },
    clearFileds(state) {
      return {
        ...state,
      };
    },
    getDataStart(state) {
      return {
        ...state,
        loading: true,
      };
    },
    getDataEnd(state, { pageNo, list, total }) {
      return {
        ...state,
        list,
        loading: false,
        pagination: {
          total,
          pageSize: state.pagination.pageSize,
          current: pageNo,
        },
      };
    },
    getDataError(state) {
      return {
        ...state,
        loading: false,
      };
    },
  },

  asyncs: {
    async getData(dispatch, getState, payload) {
      try {
        dispatch({ type: 'getDataStart' });
        const { pagination } = getState();
        const pageSize = payload && payload.pageSize ? payload.pageSize : pagination.pageSize;
        const pageNo = payload && payload.current ? payload.current : pagination.current;
        const params = {
          pageSize,
          pageNo,
        };
        const res = await getData(params);
        if (res && res.data) {
          dispatch({
            type: 'getDataEnd', payload: {
              pageNo,
              list: res.data.contents || [],
              total: res.data.totalItems || 0,
            },
          });
          return;
        }
        dispatch({ type: 'getDataError' });
      } catch (err) {
        dispatch({ type: 'getDataError' });
      }
    },
  },
};
`;
  fs.writeFileSync(scssPath, str);
  toast.success(`store 创建成功`);
}
