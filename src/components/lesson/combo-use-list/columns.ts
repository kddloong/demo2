const columns = [
  {
    title: '报名单号',
    dataIndex: 'signUpNo',
    key: 'signUpNo',
    hideInSearch: true,
    hideInTable: false,
    width: '5%',
  },
  {
    title: '套餐名称',
    dataIndex: 'comboName',
    key: 'comboName',
    hideInSearch: true,
    hideInTable: false,
    width: '5%',
  },
  {
    title: '手机号',
    dataIndex: 'phoneNo',
    key: 'phoneNo',
    hideInSearch: true,
    hideInTable: false,
    width: '5%',
  },
  {
    title: '消课时间',
    dataIndex: 'createDate',
    key: 'createDate',
    hideInSearch: true,
    hideInTable: false,
    width: '6%',
  },
];

export { columns as comboUseColumns };
