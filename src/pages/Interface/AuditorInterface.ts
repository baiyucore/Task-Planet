//发布通知
export interface Postnotice{
  noticename: string,
  noticecompletion: string,
  noticeid:string,
}
//显示通知
export interface ViewPostNotice{
  noticename: string,
  noticecompletion: string,
  noticetime: number,
  noticeid: string,
}
export interface time{
  year:string,
  month:string,
  day:string,
}
//登入
export interface login{
  account_id: string,
  account_password : string,
}

//显示所有举报信息
export interface warnarray{
  warnuserid : string,
  warnedcommentid : string,
  warncomment:string,
  taskid : string,
  classname : string,
  _id: string,
  location:string,
}

//显示审核记录
export interface viewauditorrecord{
  result:string,
  warnuserid:string,
  warnedcommentid:string,
  warninfor:string,
  _id:string,
}

//查看所有评论
export interface AuditorViewComment{
  _id:string,
  classname: string,
  taskstarttime : number,
  taskovertime: number,
  taskid: string,
  taskname : string,
}

//删除通知
export interface deltenotice{
  noticeid:string
}
//发布通知
export interface publishnotice{
  noticeid:string,
  time: string,
}