import {  type DateValue} from '@internationalized/date'

 //创建者添加班级
 export interface createaddclass{
  account_id : string,
  classname : string,
  classbrief : string,
  userinvitecode : string,
  manageinvitecode: string,
}

export interface CreateClass{
  classname : string, 
  // 无法在laf中查询
  _id: string,
  manageinvitecode: string,
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
}
//创建者个人信息
export interface Createreviseoneself{
  account_id : string,
  create_name : string,
  create_sex : string,
  create_profile : string,
}

//创建者显示班级数据
export interface CreateMember{
  account_id : string,
  create_name : string,
}
export  interface manageview{
  manage: ManagaMeber
}
export interface ManagaMeber{
  account_id: string,
  manage_name : string,
}
export interface userview{
  user:UserMeber
}
export interface UserMeber{
  account_id : string,
  user_name : string,
}
export interface  CheckClassManageMember{
  create: CreateMember,
  manage: manageview,
  classname : string,
}
export interface CheckClassUserMember{
  user : userview,
}
export interface checkprerequisite{
  manage: string,
  user : string,
}

//搜索名字
export interface searchname{
  manageinvitecode : string,
  userinvitecode : string ,
  searchname : string,
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
  taskovertime: Time,
  taskstarttime:Time,
  successrewardone: number,
  successrewardtwo_one : number,
  successrewardtwo_two : number,
  failed : number,
}
export interface Time{
  year: string,
  month:string,
  day:string,
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
  classname: string,
  taskstarttime : Time,
  taskovertime: Time,
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
//申请信息
export interface CreateApplyinfor{
  userid:string,
  classname : string,
  create_id: string,
  username : string,
  userinvitecode : string,
}
// 申请同意或拒绝
export interface applycondition{
  userid: string,
  userinvitecode : string,
  classname : string,
  condition: string,
  username : string,
  createid : string,
}

