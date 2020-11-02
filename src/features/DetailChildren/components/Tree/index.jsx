import React, { useState } from 'react';
import './TreeDetail.scss';
import 'antd/dist/antd.css';
import { Tree } from 'antd';
import { rename, renameHoanCanh } from '../../../../helpers/renamePropertyObject';

//['0-0-0', '0-0-1']  ['0-0-0']

// const getKeys = data => {
//   const nestedKeys = data.map(node => {
//     let childKeys = [];
//     if (node.children) {
//       childKeys = getAllKeys(node.children);
//     }
//     if(node.value){
//       return [childKeys, node.key];
//     }
//   });
//   return flattenDeep(nestedKeys);
// };

const TreeDetail = ({treeData, treeDataDetailChildren}) => {
console.log("Tree Data Detail CHildren : ",treeData)
console.log("Tree Data : ",treeDataDetailChildren)
  const [expandedKeys, setExpandedKeys] = useState(treeDataDetailChildren);
  const [checkedKeys, setCheckedKeys] = useState(treeDataDetailChildren);
  const [selectedKeys, setSelectedKeys] = useState([]);
  const [autoExpandParent, setAutoExpandParent] = useState(true);

  const onExpand = (expandedKeys) => {
    console.log('onExpand', expandedKeys); // if not set autoExpandParent to false, if children expanded, parent can not collapse.
    // or, you can remove all expanded children keys.

    setExpandedKeys(expandedKeys);
    setAutoExpandParent(false);
  };

  const onCheck = (checkedKeys) => {
    console.log('onCheck', checkedKeys);
    setCheckedKeys(checkedKeys);
  };

  const onSelect = (selectedKeys, info) => {
    console.log('onSelect', info);
    setSelectedKeys(selectedKeys);
  };

  return (
    <Tree
      checkable
      onExpand={onExpand}
      expandedKeys={expandedKeys}
      autoExpandParent={autoExpandParent}
      onCheck={onCheck}
      showLine
      style={{ width: '100%', marginTop: "22px" }}
      height={500}
      checkedKeys={checkedKeys}
      onSelect={onSelect}
      selectedKeys={selectedKeys}
      treeData={rename(treeData)}
    />
  );
};

export default TreeDetail