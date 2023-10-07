export declare namespace Bracelet {
  type BraceletItem = {
    cardNo1: string;
    cardNo2: string;
    id: string;
    memo: string;
    no: string;
    status: string;
  };

  type BraceletListItem = BraceletItem & NormalResponseField;
}
