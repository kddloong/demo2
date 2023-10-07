import { handleDictionary } from '@/utils/main/main/dictionary';
import { genderRenderFromObj, tagRender } from '@/utils/render';
import type { ProColumns } from '@ant-design/pro-components';
import { actPriceFormDigit, payStatusFormSelect } from '@/utils/columnUtils';
import { sexOptions } from '@/utils/utils';
import { LessonArrange } from 'types/lesson/lesson-arrange';
import { LessonSignUpPayTypeEnum } from '@/utils/enums';
import {
  lessonSignUpPayType,
  lessonSignUpStatusOptions,
} from '@/utils/lesson/lesson-arrange/group-lesson-arrange';

export const lessonArrangeSignUpColumns = (
  isLimitGender: string,
  isLimitAge: string,
): ProColumns<LessonArrange.SignUpPersonItem>[] => {
  return [
    {
      title: '报名单号',
      dataIndex: 'signUpNo',
      key: 'signUpNo',
      hideInSearch: false,
      hideInTable: false,
      width: '10%',
    },

    {
      title: '会员卡号',
      dataIndex: 'cardNo',
      key: 'cardNo',
      hideInSearch: true,
      hideInTable: false,
      width: '8%',
    },
    {
      title: '姓名',
      dataIndex: 'name',
      key: 'name',
      hideInSearch: true,
      hideInTable: false,
      width: '10%',
    },
    {
      title: '性别',
      dataIndex: 'gender',
      key: 'gender',
      hideInSearch: true,
      //-1不限制,0限制男,1限制女
      //不限制时把性别显示出来
      hideInTable: isLimitGender !== '-1',
      width: '8%',
      valueType: 'select',
      fieldProps: {
        options: [...sexOptions, { label: '-', value: 'null' }],
      },
    },
    {
      title: '年龄',
      dataIndex: 'age',
      key: 'age',
      hideInSearch: true,
      //0不限制，1限制
      hideInTable: isLimitAge === '0',
      width: '5%',
      render: (_, record) => {
        return record.age === 0 ? '-' : record.age;
      },
    },
    {
      title: '身高',
      dataIndex: 'height',
      key: 'height',
      hideInSearch: true,
      //0不限制，1限制
      hideInTable: true,
      width: '5%',
      render: (_, record) => {
        return record.height === 0 ? '-' : record.height;
      },
    },
    {
      title: '体重',
      dataIndex: 'weight',
      key: 'weight',
      hideInSearch: true,

      hideInTable: true,
      //0不限制，1限制
      width: '5%',
      render: (_, record) => {
        return record.weight === 0 ? '-' : record.weight;
      },
    },
    {
      title: '手机号',
      dataIndex: 'phoneNo',
      key: 'phoneNo',
      hideInSearch: false,
      hideInTable: false,
      width: '8%',
    },
    payStatusFormSelect as ProColumns,

    lessonSignUpPayType(),
    {
      title: '支付时间',
      dataIndex: 'signUpTime',
      key: 'signUpTime',
      hideInSearch: true,
      hideInTable: false,
      width: '10%',
    },
    {
      title: '支付金额',
      dataIndex: 'price',
      key: 'price',
      hideInSearch: true,
      hideInTable: false,
      width: '7%',
      render: (_, record) => {
        if (record.type === LessonSignUpPayTypeEnum.USE_COMBO) {
          return '-';
        }

        return record.price;
      },
    },
    {
      ...actPriceFormDigit,
      width: '8%',
      render: (_, record) => {
        if (record.type === LessonSignUpPayTypeEnum.USE_COMBO) {
          return '-';
        }
        return record.actPrice;
      },
    },
    {
      title: '消耗课时数',
      dataIndex: 'classNum',
      key: 'classNum',
      hideInSearch: true,
      hideInTable: false,
      width: '8%',
    },
    {
      title: '报名时间',
      dataIndex: 'signUpTime',
      key: 'signUpTime',
      hideInSearch: true,
      hideInTable: false,
      width: '10%',
    },
    {
      title: '签到状态',
      dataIndex: 'checkIn',
      key: 'checkIn',
      hideInSearch: true,
      hideInTable: false,
      width: '10%',
      valueType: 'select',
      render: (_, record) => {
        if (record.checkIn === '0') {
          return tagRender('red', '未签到');
        }

        if (record.checkIn === '1') {
          return tagRender('green', '已签到');
        }

        return null;
      },
      fieldProps: {
        options: [
          {
            label: '未签到',
            value: '0',
          },
          {
            label: '已签到',
            value: '1',
          },
        ],
      },
    },

    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      hideInSearch: true,
      hideInTable: false,
      width: '10%',
      valueType: 'select',
      request: async () => {
        return await handleDictionary('lesson_sign_up_status');
      },
      render: (_, record) => {
        return genderRenderFromObj(lessonSignUpStatusOptions, record.status);
      },
    },
    {
      title: '报名来源',
      dataIndex: 'source',
      key: 'source',
      hideInSearch: true,
      hideInTable: false,
      width: '8%',
      valueType: 'select',
      request: async () => {
        return await handleDictionary('order_source');
      },
    },
    {
      title: '退款原因',
      dataIndex: 'refundReason',
      key: 'refundReason',
      hideInTable: false,
      hideInSearch: true,
      width: '8%',
      ellipsis: true,
    },
    {
      title: '退款金额',
      dataIndex: 'refundPrice',
      key: 'refundPrice',
      hideInSearch: true,
      hideInTable: false,
      width: '7%',
    },
    {
      title: '退款课时',
      dataIndex: 'refundClassNum',
      key: 'refundClassNum',
      hideInSearch: true,
      hideInTable: false,
      width: '7%',
    },
  ];
};
