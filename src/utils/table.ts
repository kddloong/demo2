// 根据参数上的索引删除表格的一行数据
const removeItemFromTable = (data: any[], index: number) => {
  data.splice(index, 1);

  return data;
};

const hiddenToolBarConfig = { toolbar: { settings: [] } };

const pageSizeTen = { pagination: { pageSize: 10 } };

const clearPadding = {
  cardProps: {
    bodyStyle: {
      padding: '0',
    },
  },
};

export { removeItemFromTable, hiddenToolBarConfig, pageSizeTen, clearPadding };
