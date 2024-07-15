import {  type DateValue} from '@internationalized/date'
//用户id
export interface Userid{
  userid: string;
}
//金币变换
export interface UserCoinChange{
  userid: string,
  coin : number,
}
//用户修改个人信息
export interface UserReviseOneself{
  userid : string,
  username: string,
  usersex : string,
  userprofile : string,
}
//用户申请
export interface UserApplyformember{
  userid : string,
  createid: string,
  userinvitecode : string,
  classname : string,
  username : string,
}
//班级信息
export interface UserClassinfor{
  classname : string,
  userinvitecode : string,
}
//提交任务
export interface UserSumitTask{
  taskid : string,
  coin : number,
  summarize : string,
  rewardselect:string,
  userid : string,
}
//显示任务
export interface UserViewAllTask{
  time: DateValue | undefined,
  userid : string,
  classname : string,
 
}
//接收显示任务
export interface UserViewTask{
  taskinfor: ViewTask,
  summarize: string,
  rewardselect:string,
}
export interface ViewTask{
task:viewTask
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

export interface UserViewUnfinishTask{
  unfinishtask : ViewUnFinishTask,
}
export interface ViewUnFinishTask{
  task:viewUnFinishTask
  }
  export interface viewUnFinishTask{
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



//加载信息
export interface UserLoadTask{
  userid : string,
  classname : string,
}


//购买商品
export interface UserBuyShopping{
  totalnumber: number,
  createid :string,
}