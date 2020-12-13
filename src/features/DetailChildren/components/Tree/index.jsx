import React, { useState } from 'react';
import './TreeDetail.scss';
import 'antd/dist/antd.css';
import { Tree } from 'antd';
import { rename, renameHoanCanh } from '../../../../helpers/renamePropertyObject';

const TreeDetail = ({
  treeData, treeDataDetailChildren, handleOnChange, 
  tabCurrent, onCheck, checkedKeys, expandedKeys,
  onHandleExpandedKeys,
}) => {

  // const [expandedKeys, setExpandedKeys] = useState([]);
  // const [checkedKeys, setCheckedKeys] = useState([]);
  const [selectedKeys, setSelectedKeys] = useState([]);
  const [autoExpandParent, setAutoExpandParent] = useState(true);

  // React.useEffect(() => {
  //   setExpandedKeys(treeDataDetailChildren);
  //   setCheckedKeys(treeDataDetailChildren);
  // },[])

  const onExpand = (expandedKeys) => {
    console.log('onExpand', expandedKeys); // if not set autoExpandParent to false, if children expanded, parent can not collapse.
    // or, you can remove all expanded children keys.

    // onHandleExpandedKeys(expandedKeys);
    setAutoExpandParent(false);
  };

  const handleOnCheck = (checkedKeys) => {
    // console.log('onCheck', checkedKeys);
    // setCheckedKeys(checkedKeys);
    // console.log("tab Current : ",tabCurrent)
    console.log({checkedKeys})
    handleOnChange(checkedKeys, tabCurrent);
    onCheck(checkedKeys);
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
      defaultExpandAll
      autoExpandParent={autoExpandParent}
      onCheck={handleOnCheck}
      showLine
      style={{ width: '100%', marginTop: "22px", height: "500px", overflow: "auto" }}
      checkedKeys={checkedKeys}
      onSelect={onSelect}
      selectedKeys={selectedKeys}
      treeData={rename(treeData)}
    />
  );
};

export default TreeDetail