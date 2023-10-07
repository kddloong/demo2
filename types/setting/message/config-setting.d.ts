import type { BaseResponseField } from '@/type/data';

export declare namespace MessageGlobalConfig {
  type MessageConfig = {
    //阿里云身份标识ID
    accessKeyId: string;
    //阿里云身份标识密码
    accessKeySecret: string;
    //主键
    id: string;
    //是否启用短信设置 0: 不启用 1：阿里云
    isStart: string;
    //备注
    memo: string;
    // 腾讯云appId
    appId?: string;
  };

  type TemplateItem = {
    //短信内容
    content: string;
    //主键
    id: string | number;
    //短信签名
    sign: string;
    //短信自定义编号
    smsCode: string;
    //启用 0：不启用 1：启用
    startUsing: string;
    //短信模板号
    templateNo: string;
    //短信类型 0：运营平台短信 1：场馆SAAS短信
    type: string;
    //场馆自用签名
    venueSign: string;
    //自定义短信模板号
    venueTemplateNo: string;
    // 厂商
    smsSource: string;
  };

  type TemplateListItem = TemplateItem & BaseResponseField;
}
