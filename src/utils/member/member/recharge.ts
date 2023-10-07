import {
  handleCreateCountOrder,
  handleCreateExpireOrder,
  handleCreateStoreOrder,
} from '@/utils/member/invest/invest';
import { InvestCardTypeEnum } from '@/utils/enums';
import { InvestCard } from '../../../../types/member/invest/invest';
import { rechargeByCash } from '@/utils/member/member/pay/rechargeByCash';
import { NEGATIVE_STATUS as CASH_PAY } from '@/utils/utils';

/**
 * 会员卡充值
 */
interface RechargeProps {
  configId: string;
  venueId: string;
  memberId: string;
  config: InvestCard.BaseConfigInfoParams;
  source?: RechargeSource;
  /** 基本返回一个 回调函数 */
  action: CallbackFunc;
  price: number;
  /** 只能是会员卡之外的充值方式*/
  payType: string;
}

interface RechargeRemakeProps {
  venueId: string;
  memberId: string;
  config: InvestCard.BaseConfigInfoParams;
  source?: RechargeSource;
  /** 基本返回一个 回调函数 */
  action: CallbackFunc;
  /** 只能是会员卡之外的充值方式*/
  payType: string;
}

type MyFunc = () => void;

type CallbackFunc = (
  payType: string,
  orderId?: string,
  cardType?: string,
  price?: number,
) => MyFunc;

type RechargeSource = 'add-member' | 'other';

/**
 * 储值卡充值
 */
async function store(
  core: InvestCard.CoreParams,
  config: InvestCard.BaseConfigInfoParams,
  source: RechargeSource,
  action: CallbackFunc,
  hideMessage: boolean,
) {
  const result = await handleCreateStoreOrder(
    {
      ...core,
      chargeConfigDetailId: config.detailId as string,
      memo: '',
    },
    hideMessage,
  );

  if (result.success) {
    const resultData = result.data as InvestCard.OpenCardResult;
    if ('id' in resultData) {
      if (core.payType !== '0') {
        if (action) {
          action(core.payType, resultData.id, config.detailType, core.price)?.();
        }
      } else {
        await rechargeByCash(
          {
            payType: core.payType,
            venueId: core.venueId,
            price: core.price,
            cardType: config.detailType,
            orderId: resultData?.id,
            callback: () => {
              action(core.payType)?.();
            },
          },
          source,
        );
      }
    }
  }
}

/**
 * 储值卡充值
 */
async function storeRemake(
  core: InvestCard.CoreParams,
  config: InvestCard.BaseConfigInfoParamsRemake,
  source: RechargeSource,
  action: CallbackFunc,
  hideMessage: boolean,
) {
  const result = await handleCreateStoreOrder(
    {
      ...core,
      chargeConfigDetailId: config.detailId as string,
      memo: '',
    },
    hideMessage,
  );

  if (result.success) {
    const resultData = result.data as InvestCard.OpenCardResult;
    if ('id' in resultData) {
      if (core.payType !== '0') {
        if (action) {
          action(core.payType, resultData.id, config.detailType, core.price)?.();
        }
      } else {
        await rechargeByCash(
          {
            payType: core.payType,
            venueId: core.venueId,
            price: core.price,
            cardType: config.detailType,
            orderId: resultData?.id,
            callback: () => {
              action(core.payType)?.();
            },
          },
          source,
        );
      }
    }
  }
}

/**
 * 计次卡充值
 */
async function count(
  core: InvestCard.CoreParams,
  config: InvestCard.BaseConfigInfoParams,
  source: RechargeSource,
  action: CallbackFunc,
  hideMessage: boolean,
) {
  const result = await handleCreateCountOrder(
    {
      ...core,
      numberConfigDetailId: config.detailId as string,
      memo: '',
    },
    hideMessage,
  );

  if (result.success) {
    const resultData = result.data as InvestCard.OpenCardResult;

    if ('id' in resultData) {
      if (core.payType !== CASH_PAY) {
        action(core.payType, resultData.id, config.detailType, core.price)?.();
      } else {
        await rechargeByCash(
          {
            payType: core.payType,
            venueId: core.venueId,
            price: core.price,
            cardType: config.detailType,
            orderId: resultData?.id,
            callback: () => {
              action(core.payType)?.();
            },
          },
          source,
        );
      }
    }
  }
}

/**
 * 计次卡充值
 */
async function countRemake(
  core: InvestCard.CoreParams,
  config: InvestCard.BaseConfigInfoParamsRemake,
  source: RechargeSource,
  action: CallbackFunc,
  hideMessage: boolean,
) {
  const result = await handleCreateCountOrder(
    {
      ...core,
      numberConfigDetailId: config.detailId as string,
      memo: '',
    },
    hideMessage,
  );

  if (result.success) {
    const resultData = result.data as InvestCard.OpenCardResult;

    if ('id' in resultData) {
      if (core.payType !== CASH_PAY) {
        action(core.payType, resultData.id, config.detailType, core.price)?.();
      } else {
        await rechargeByCash(
          {
            payType: core.payType,
            venueId: core.venueId,
            price: core.price,
            cardType: config.detailType,
            orderId: resultData?.id,
            callback: () => {
              action(core.payType)?.();
            },
          },
          source,
        );
      }
    }
  }
}

/**
 * 期限卡充值
 */
async function expire(
  core: InvestCard.CoreParams,
  config: InvestCard.BaseConfigInfoParams,
  source: RechargeSource,
  action: CallbackFunc,
  hideMessage: boolean,
) {
  const result = await handleCreateExpireOrder(
    {
      ...core,
      continueConfigDetailId: config.detailId as string,
      memo: '',
    },
    hideMessage,
  );

  if (result.success) {
    const resultData = result.data as InvestCard.OpenCardResult;

    if ('id' in resultData) {
      if (core.payType !== '0') {
        action(core.payType, resultData.id, config.detailType, core.price)?.();
      } else {
        await rechargeByCash(
          {
            payType: core.payType,
            venueId: core.venueId,
            price: core.price,
            cardType: config.detailType,
            orderId: resultData?.id,
            callback: () => {
              action(core.payType)?.();
            },
          },
          source,
        );
      }
    }
  }
}

/**
 * 期限卡充值
 */
async function expireRemake(
  core: InvestCard.CoreParams,
  config: InvestCard.BaseConfigInfoParamsRemake,
  source: RechargeSource,
  action: CallbackFunc,
  hideMessage: boolean,
) {
  const result = await handleCreateExpireOrder(
    {
      ...core,
      continueConfigDetailId: config.detailId as string,
      memo: '',
    },
    hideMessage,
  );

  if (result.success) {
    const resultData = result.data as InvestCard.OpenCardResult;

    if ('id' in resultData) {
      if (core.payType !== '0') {
        action(core.payType, resultData.id, config.detailType, core.price)?.();
      } else {
        await rechargeByCash(
          {
            payType: core.payType,
            venueId: core.venueId,
            price: core.price,
            cardType: config.detailType,
            orderId: resultData?.id,
            callback: () => {
              action(core.payType)?.();
            },
          },
          source,
        );
      }
    }
  }
}

/**
 * 会员卡充值入口
 * @param params
 * @param params.payType   只能是会员卡之外的充值方式
 * @param hideMessage
 */
async function recharge(params: RechargeProps, hideMessage: boolean = false) {
  const { config, source = 'add-member', action } = params;

  const coreParams: InvestCard.CoreParams = {
    configId: params.configId || config.configId,
    venueId: params.venueId,
    memberId: params.memberId || '',
    price: params.price,
    payType: params.payType,
  };

  if (config.detailType === InvestCardTypeEnum.STORE_CARD) {
    await store(coreParams, config, source, action, hideMessage);
  }

  if (config.detailType === InvestCardTypeEnum.EXPIRE_CARD) {
    await expire(coreParams, config, source, action, hideMessage);
  }

  if (config.detailType === InvestCardTypeEnum.COUNT_CARD) {
    await count(coreParams, config, source, action, hideMessage);
  }
}

export { recharge };

/**
 * 会员卡充值入口, 2023-09-07修改版
 * @param params
 * @param params.payType   只能是会员卡之外的充值方式
 * @param hideMessage
 */
async function rechargeRemake(params: RechargeRemakeProps, hideMessage: boolean = false) {
  const { config, source = 'add-member', action } = params;

  const coreParams: InvestCard.CoreParams = {
    configId: config.configId,
    venueId: params.venueId,
    memberId: params.memberId || '',
    price: config.price,
    payType: params.payType,
  };

  const simpleConfig = {
    detailType: config.detailType,
    detailId: config.detailId,
  };

  if (config.detailType === InvestCardTypeEnum.STORE_CARD) {
    await storeRemake(coreParams, simpleConfig, source, action, hideMessage);
  }
  //
  if (config.detailType === InvestCardTypeEnum.EXPIRE_CARD) {
    await expireRemake(coreParams, config, source, action, hideMessage);
  }
  //
  if (config.detailType === InvestCardTypeEnum.COUNT_CARD) {
    await countRemake(coreParams, simpleConfig, source, action, hideMessage);
  }
}

export { rechargeRemake };
