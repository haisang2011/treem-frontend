import { flattenDeep } from 'lodash';

const getAllKeys = data => {
  const nestedKeys = data.map(node => {
    let childKeys = [];
    if (node.children) {
      childKeys = getAllKeys(node.children);
    }
    if(node.value){
      return [childKeys, node.value];
    }
  });
  return flattenDeep(nestedKeys);
};

const result = (data) => getAllKeys(data).filter(e => e);

export default result;