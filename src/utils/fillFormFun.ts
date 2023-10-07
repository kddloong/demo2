import { DeveloperCertResultData } from '../../types/enterprise/enterprise';

export const fillFormFun = (data: any, form: any) => {
  const result = data;
  if (result.success) {
    const resultData = result.data as DeveloperCertResultData;
    if (resultData) {
      if (!resultData.licenseImgUrl) {
        // 如果没有图片
        Object.assign(resultData, {
          licenseImgUrl: [],
        });
      } else {
        Object.assign(resultData, {
          licenseImgUrl: [
            {
              uid: '-5',
              name: 'picture',
              url: resultData.licenseImgUrl + '',
              status: 'done',
            },
          ],
        });
      }

      if (!resultData.logo) {
        Object.assign(resultData, {
          logo: [],
        });
      } else {
        Object.assign(resultData, {
          logo: [
            {
              uid: '-3',
              name: 'log_pic',
              url: resultData.logo + '',
              status: 'done',
            },
          ],
        });
      }

      if (!resultData.enterpriseAddress) {
        Object.assign(resultData, {
          enterpriseAddressArr: ' ',
        });
      } else {
        Object.assign(resultData, {
          enterpriseAddressArr: resultData.enterpriseAddress,
        });
      }

      if (!resultData.addressDetail) {
        Object.assign(resultData, {
          addressDetail: ' ',
        });
      }
    }

    form.setFieldsValue({
      ...resultData,
    });
  }
};
