import {  type DateValue} from '@internationalized/date'

 //创建者添加班级
 export interface createaddclass{
  account_id : string,
  classname : string,
  classbrief : string,
  userinvitecode : string,
}

export interface CreateClassnameId{
  id : string,
  
  // classname_id : string,
}

//创建者id
export interface Createid {
  account_id : string;
}
// 创建者加入商品
export interface CreateAddproduct {
  createid : string,
  productname : string,
  productprice : number,
  totalnumber : number,
  productid:string,
}
//创建者个人信息
export interface Createreviseoneself{
  account_id : string,
  create_name : string,
  create_sex : string,
  create_profile : string,
  createstartname:string,
}

//创建者显示班级数据
export interface CreateMember{
  account_id : string,
  create_name : string,
}
export interface userview{
  user:UserMeber
}
export interface UserMeber{
  account_id : string,
  user_name : string,
}
export interface  CheckClassCreateMember{
  create: CreateMember,
  classname : string,
}
export interface CheckClassUserMember{
  user : userview,
}
export interface checkprerequisite{
  user : string,
}

//搜索名字
export interface searchname{
  searchnameid : string,
  identity:string,
}
//搜索栏搜索
export interface Searchname{
  userinvitecode : string ,
  searchname:string,
}
//修改商品
export interface Createmodifyproduct{
  product_name : string ,
  productname : string,
  productprice : number,
  totalnumber : number,
}

//下架商品
export interface CreateRemove{
  proddcutname : string,
}

//添加or 修改任务
export interface CreateAddTask{
  condition : string,
  taskid : string,
  account_id : string,
  taskname :string,
  taskcompletion : string,
  taskovertime: DateValue | undefined,
  taskstarttime:DateValue | undefined,
  successrewardone: number,
  successrewardtwo_one : number,
  successrewardtwo_two : number,

  failed : number,
}

//接收显示任务
export interface CreateViewTask{
  task: viewTask,
  
}
export interface viewTask{
  condition : string,
  taskid : string,
  taskname :string,
  taskCompletionConditions : string,
  taskovertime: number,
  taskstarttime:number,
  successrewardone: number,
  successrewardtwo_one : number,
  successrewardtwo_two : number,
  failed : number,
}
// 
export interface Time{
  test:number
}

//显示未发布任务
export interface CreateUnfinish{
  taskname: string,
  taskid : string,
}

//移除任务
export interface Createremovetask{
  taskid: string,
  createid: string,
  condition:string,
}

//发布任务
export interface Createpublictask{
  creatateid:string,
  taskid: string,
  checkclass : Array<string>,
}

//显示任务
export interface CreateViewtask{
  account_id :string,
  condition: string,
}
//评论信息发送
export interface CreateComment{
  time: DateValue | undefined,
  createid : string,
}
//评论信息接收
export interface CreateViewComment{
  _id:string,
  classname: string,
  taskstarttime : number,
  taskovertime: number,
  taskid: string,
  taskname : string,
}
//任务信息
export interface Createtaskinfor{
  classname: string,
  taskstarttime : Time,
  taskovertime: Time,
  taskid: string,
  taskname : string,
}

// 申请同意或拒绝
export interface applycondition{
  userid: string,
  userinvitecode : string,
  classname : string,
  condition: string,
  createid : string,
  username : string,
}

//删除总结里的评论
export interface deletecomment{
  taskid: string,
  commentid:string,
  comment:string,
}
//删除总结
export interface deletesummarize{
  taskid:string,
  userid: string,
  summarize: string,
}
//显示外部评论
export interface ViewOuterComment{
  taskid:string,
  userid: string,
}
//移除班级成员
export interface Removeclassmember{
  userid : string,
  userinvitecode : string,
  classname : string,
}