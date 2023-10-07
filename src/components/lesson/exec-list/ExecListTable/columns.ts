import { ProColumns } from '@ant-design/pro-components';

const columns: ProColumns<ExecRecord.ExecRecordItem>[] = [
  {
    title: '课程名称',
    dataIndex: 'className',
    key: 'classId',
    hideInTable: false,
    width: '10%',
  },
  {
    title: '上课时间',
    dataIndex: 'planId',
    key: 'planId',
    hideInSearch: true,
    hideInTable: false,
    width: '10%',
    render: (_, record) => {
      return `${record.planDate} ${record.timeFrom} - ${record.timeTo}`;
    },
  },
  {
    title: '私教老师',
    dataIndex: 'teacherName',
    key: 'teacherId',
    hideInSearch: true,
    hideInTable: false,
    width: '10%',
  },
  {
    title: '签到人数',
    dataIndex: 'num',
    key: 'num',
    hideInSearch: true,
    hideInTable: false,
    width: '10%',
    render: (_, record) => {
      return `${record.realityNum}/${record.num}`;
    },
  },
  {
    title: '备注',
    dataIndex: 'memo',
    key: 'memo',
    hideInSearch: true,
    hideInTable: false,
    width: '10%',
    ellipsis: true,
  },
];

export { columns };
