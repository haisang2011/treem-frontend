import { flattenDeep } from 'lodash';

const FindKeys = (data) => {
    const nestedKeys = data.map(node => {
        let childKeys = [];
        if (node.children) {
          if(node.value){
            childKeys = FindKeys(node.children);
            return [childKeys, node.id_hoancanh];
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