export type AlertInfo = {
  content: string;
  linkAddress: string;
  linkType: string;
  linkText: string;

  isHyperlink: string;

  showType: string;
};

export type AlertResp = {
  [type: string]: AlertInfo[];
};
