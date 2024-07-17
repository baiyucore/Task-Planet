import {  type DateValue} from '@internationalized/date'
//发布通知
export interface Postnotice{
  noticename: string,
  noticecompletion: string,
  noticetime: DateValue | undefined,
  noticeid:string,
}
//显示通知
export interface ViewPostNotice{
  noticename: string,
  noticecompletion: string,
  noticetime: time,
  noticeid: string,
}
export interface time{
  year:string,
  month:string,
  day:string,
}