import type { LabelValueItem } from '@/type/data';
import { DataItem } from '@antv/g2plot/esm/interface/config';

export { DataItem };

export namespace Dashboard {
  interface IndexOrderStatisticItem {
    // 上月营收
    lastMonthRevenue: number;
    // 月同比
    monthGrowthRate: string;
    // 当月营收
    monthRevenue: number;
    // 日同比
    todayGrowthRate: string;
    // 日营收
    todayRevenue: number;
    // 总营收
    totalRevenue: number;
    // 周同比
    weekGrowthRate: string;
  }

  interface CaijiDashboardStatisticItem {
    // 异常数量
    dayGrowthRate: number;
    // 正常数量
    todayNew: number;
    //审核正常占比
    total: string;
  }

  interface TrafficStatisticItem {
    dayGrowthRate: number;
    total: number;
  }

  type ShowTrafficStatisticItem = {
    dayTrafficGrowthRate: number;
    trafficTotal: number;
  };

  type IntroduceRowItem = IndexOrderStatisticItem & {
    order12MonthColumn: number[];
  } & ShowTrafficStatisticItem & {
      trafficLine: LabelValueItem[];
    } & CaijiDashboardStatisticItem;
}
