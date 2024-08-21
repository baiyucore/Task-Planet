export interface accountinfor{
  account_id : string,
  account_passowrd : string,
}
export interface firstfill{
  account_name : string,
  account_id: string,
  account_sex:string,
  account_identites:string,
}

export interface notice {
  existednumber: number;
  notification: Notification[];
}
interface Notification {
  _id: string;
  noticename:string,
  noticecompletion:string,
}