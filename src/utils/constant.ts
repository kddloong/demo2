const PLACEHOLDER_CONTACT = '联系人';

const FORM_CONTACT = 'contact';

const PLACEHOLDER_CONTACT_PHONE = '联系方式';

const FORM_CONTACT_PHONE = 'phoneNo';

export { PLACEHOLDER_CONTACT, PLACEHOLDER_CONTACT_PHONE };
export { FORM_CONTACT, FORM_CONTACT_PHONE };

enum selectDataType {
  // 所有的数据
  ALL_DATA = '0',

  // 状态为正常的数据
  NORMAL_DATA = '1',
}

export { selectDataType };

/**
 * 支付方式一一对应
 */
export const payTypeOptionsForSpecial = {
  '0': '现金',
  '1': '微信',
  '2': '支付宝',
  '3': '云闪付',
  '4': '会员卡',
  '5': '云闪付',
  '6': '联合支付',
};
