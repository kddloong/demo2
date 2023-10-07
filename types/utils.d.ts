// @ts-ignore
/* eslint-disable */
import { Dispatch, SetStateAction } from 'react';
import { LessonCategoryEnum } from '@/utils/enums';

export namespace TypeUtil {
  type ChangeSortList = {
    id: string;
    sort: number;
  };

  type SetState<T> = Dispatch<SetStateAction<T>>;

  interface BaseOrderParams {
    // 订单id
    id: string;
  }

  export interface RequestResult<T = null, N = null> {
    code: number;
    msg: string;
    success: boolean;
    data: T;
    count: N;
  }

  type RequestTableResult<T> = RequestResult<T, number>;

  /**
   * 请求 select 组件数据
   */
  type RequestSelectData = RequestResult<LabelValueItem[]>;

  type RequestTableParams = {
    pageSize?: number | undefined;
    current?: number | undefined;
    field?: string;
    order?: 'desc' | 'asc';
  };

  /**
   * timeFrom 和 timeTo
   */
  type SearchTimeRangeParams = {
    timeFrom: string;
    timeTo: string;
  };

  type ModalBaseProps = {
    visible: boolean;
    setVisible: TypeUtil.SetState<boolean>;

    refresh: () => void;
  };

  type BaseParams = {
    // 用户池id
    tenantId: string;
  };

  type ChartTimeRange = {
    beginTime: string;
    endTime: string;

    tenantId?: string;

    clientId?: string;
  };

  //通用的返回的数据字段, 基本上每个查询列表数据的接口都会返回
  interface NormalResponseField {
    updateDate?: string;
    updateName?: string;
    createDate: string;
    createName: string;
    versions: number;
  }

  interface BaseLessonCategoryProps {
    lessonCategory: LessonCategoryEnum;
  }
}

/**
 * 支付订单的基本参数
 */
export type CommonPayParams = {
  authCode: string;
  id: string;
  payType: string;
};

export type ChangeStatus = 'start' | 'end';

export interface RequestResult<T = null, N = null> {
  code: number;
  msg: string;
  success: boolean;
  data: T;
  count: N;
}

export type RequestTableResult<T> = RequestResult<T, number>;

export interface RequestTableParam {
  pageSize?: number | undefined;
  current?: number | undefined;
  field?: string;
  order?: 'desc' | 'asc';
  type?: string;
}

export type PayResult = { wx_message: string } | null;

/**
 * 请求 select 组件数据
 */
type RequestSelectData = RequestResult<LabelValueItem[]>;

/**
 * 返回的数据里面有一个id ,用于后边的步骤
 */
type RequestIdData = RequestResult<string>;

export type LabelValueItem = {
  label: string;
  value: string;
  imageUrl?: string;
};

export type ShowOrUpdate = 'show' | 'update';

/**
 * 用于treeSelect
 */
interface TreeItem {
  value: string;
  title: string;
  children?: TreeItem[];
}

interface TreeItemForProTable {
  label: string;
  value: string;
  children?: TreeItemForProTable[];
}

export type TreeData = RequestResult<TreeItem[]>;

interface SaasResponseField {
  clientId: string;
  tenantId: string;
}

export type ObjToGenerateOptions = Record<
  string,
  {
    label: string;
    color: string;
  }
>;

/**
 * 返回的实体会多上这几个字段
 */
type BaseResponseField = SaasResponseField & NormalResponseField;

type MergeRequestTableParams<T> = RequestTableParam & T;

/**
 * timeFrom 和 timeTo
 */
type SearchTimeRangeParams = {
  timeFrom: string;
  timeTo: string;
};

type MergeSearchTimeRangeParams<T> = SearchTimeRangeParams & T;

type SearchDateRangeParams = {
  fromDate: string;
  toDate: string;
};

type BaseVisibleParams = {
  visible: boolean;
  setVisible: TypeUtil.SetState<boolean>;
};

export { RequestSelectData, RequestIdData };
export { MergeRequestTableParams };
export { SearchTimeRangeParams, MergeSearchTimeRangeParams };
export { SearchDateRangeParams };
export { TreeItem, TreeItemForProTable };
export { NormalResponseField, SaasResponseField, BaseResponseField };
export { BaseVisibleParams };

/**
 * reverse-pay-check 是售票的功能
 */
export type SettleOrderType =
  | 'reverse'
  | 'start'
  | 'reverse-pay'
  | 'start-pay'
  | 'occupy'
  | 'reverse-pay-check';
