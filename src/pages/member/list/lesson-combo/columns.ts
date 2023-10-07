import type { ProColumns } from '@ant-design/pro-components';
import type { MemberLessonOrderItem } from '@/pages/member/list/lesson-combo/data';

export const columns: ProColumns<MemberLessonOrderItem>[] = [
  {
    title: '课程名称',
    dataIndex: 'className',
    key: 'className',
    hideInSearch: true,
    hideInTable: false,
    width: '10%',
  },
  {
    title: '课时数',
    dataIndex: 'classNum',
    key: 'classNum',
    hideInSearch: true,
    hideInTable: false,
    width: '10%',
  },

  {
    title: '已使用课时数',
    dataIndex: 'useClassNum',
    key: 'useClassNum',
    hideInSearch: true,
    hideInTable: false,
    width: '10%',
  },
  {
    title: '有效期',
    dataIndex: 'valid',
    key: 'valid',
    hideInSearch: true,
    hideInTable: false,
    width: '10%',
    render: (_, record) => {
      return `${record.validFrom} - ${record.validTo}`;
    },
  },
];
