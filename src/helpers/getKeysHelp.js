import { flattenDeep } from 'lodash';

const FindKeysHelp = (data) => {
    const nestedKeys = data.map(node => {
      let childKeys = [];
      if (node.children) {
        if(node.value){
          childKeys = FindKeysHelp(node.children);
          return [childKeys, node.id_hinhthuc];
        }
        childKeys = FindKeysHelp(node.children);
      }
  
      return [childKeys, undefined];
      
    });
    return flattenDeep(nestedKeys);
  };
  
  export const getKeysHelp = data => {
      const primativeData = FindKeysHelp(data);
      const resultData = primativeData.filter((id) => id);
      return resultData;
  }