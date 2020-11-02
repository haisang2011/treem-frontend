import { flattenDeep } from 'lodash';

const FindKeys = (data) => {
    const nestedKeys = data.map(node => {
        let childKeys = [];
        if (node.children) {
          if(node.value){
            childKeys = FindKeys(node.children);
            return [childKeys, node.id_chitietloaihoancanh];
          }
          childKeys = FindKeys(node.children);
        }
    
        return [childKeys, undefined];
        
      });
      return flattenDeep(nestedKeys);
};

export const getKeys = data => {
    const primativeData = FindKeys(data);
    const resultData = primativeData.filter((id) => id);
    return resultData;
}


const FindKeysHelp = data => {
    const nestedKeys = data.map(node => {
      let childKeys = [];
      if (node.children) {
        if(node.value){
          childKeys = getKeys(node.children);
          return [childKeys, node.id_hinhthuc];
        }
        childKeys = getKeys(node.children);
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