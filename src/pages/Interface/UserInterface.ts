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
  username : string,
}
//显示任务
export interface UserViewAllTask{
  time: DateValue | undefined,
  userid : string,
  classname : string,
 
}
//接收显示任务
export interface UserViewTask{
  _id:string,
  taskinfor: ViewTask,
  summarize: string,
  rewardselect:string,
}
export interface ViewTask{
  task:viewTask,
  taskcondition:string,

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
export interface Time{
  year: string,
  month:string,
  day:string,
}

export interface UserViewUnfinishTask{
  unfinishtask : ViewUnFinishTask,
  taskcondition: string,
  _id:string,
}
export interface ViewUnFinishTask{
  task:viewUnFinishTask
  }
  export interface viewUnFinishTask{
    _id:string,
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

export interface Comment{
  classname : string,
  time: DateValue | undefined,
}

export interface viewcomment_task{
  classname : string,
  task:Task
}
export interface Task{
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


//显示任务
export interface ViewCommenttask{
  taskid:string,
  username : string,
  userid: string,
  summarize:string,
}
export interface test{

}
export interface othercomment{
  commentid:string,
  comment:string,

}


//用户提交评论
export interface UsersumitComment{
  commentid : string,
  comment : string,
  taskid: string,
  userid :string,
  name : string,
}
export interface UsersubmitInnterComment{
  taskid:string,
  name : string,
  commentid:string,
  comment:string,

  other_commentid:string,
  other_comment:string,
  other_commentname : string,
}

//显示外部评论
export interface ViewOuterComment{
  taskid:string,
  userid: string,
}
export interface ViewOutercomment{
  name : string,
  comment: string,
  taskid:string,
  commentid:string,
  commentnumber:number,
}

export interface searchinnerComment{
  taskid: string,
  commentid:string,
  comment:string,
}

export interface ViewInnerComment{
  other_comment:string,
  other_commentid:string,
  other_commentname:string,
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

//加入班级的邀请码
export interface classinvitecode{
  userinvitecode : string,
}