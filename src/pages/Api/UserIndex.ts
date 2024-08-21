import axios from "axios";
import {Userpath} from "./path";
import { UserApplyformember, UserBuyShopping, 
  Comment,UserCoinChange, UserLoadTask, UserReviseOneself,
   UserSumitTask, UserViewAllTask, Userid, UsersumitComment, 
   ViewOuterComment, UsersubmitInnterComment, searchinnerComment, 
   searchname, Searchname, classinvitecode, 
   warnsummarize
  } from "../Interface/UserInterface";




const userapi = {
  //显示个人信息
  async  viewoneself(params : Userid){
    const response = await axios.post(Userpath.UserViewOneslefUrl,{
      userid : params.userid,
    });
    return response.data;
  },//修改个人信息
  async reviseoneself(params : UserReviseOneself){
    const response = await axios.post(Userpath.UserReviseOneslefUrl,{
      userid:params.userid,
      user_name : params.username,
      user_sex: params.usersex,
      user_profile : params.userprofile,
      userstartname : params.userstartname
    });
    return response.data;
  },//在商城中商品
  async viewshopping(params : string){
    const response = await axios.post(Userpath.UserViewShoppingUrl,{
      createid : params,
    });
    return response.data;
  },//搜索班级
  async searchclass(params:classinvitecode){
    const response = await axios.post(Userpath.UserSearchClassUrl,{
      userinvitecode : params.userinvitecode,
    });
    return response.data;
  },//申请加入
  async applyformember(params : UserApplyformember){
    const response = await axios.post(Userpath.UserApplyForMember,{
      userid : params.userid,
      createid : params.createid,
      userinvitecode : params.userinvitecode,
      classname : params.classname,
      username: params.username,
    });
    return response.data;
  },//班级显示
  async viewclass(userid : string){
    const response = await axios.post(Userpath.UserViewClassUrl,{
      userid: userid,
    });
    return response.data;
  },//查找班级成员
  async checkclassmember(userinvitecode: string){
    const response = await axios.post(Userpath.UserCheckClassMemberUrl,{
      userinvitecode:userinvitecode,
    });
    return response.data;
  },//查询成员信息
  async searchname(params:searchname){
    const response = await axios.post(Userpath.UsersearchnameUrl,{
      searchnameid : params.searchnameid,
      identity : params.identity,
      
    })
    return response.data;
  },//搜索栏搜索
  async searchnametwo(params:Searchname){
    const response = await axios.post(Userpath.UsersearchnametwoUrl,{
      userinvitecode :params.userinvitecode,
      searchname : params.searchname,
    })
    return response.data;
  },
  //提交任务
  async SubmitTask(params : UserSumitTask){
    const response = await axios.post(Userpath.UserSubmitTaskUrl,{
      taskid : params.taskid,
      coin : params.coin,
      summarize : params.summarize,
      rewardselect:params.rewardselect,
      userid : params.userid,
      username : params.username,
    });
    return response.data;
  },//显示所有任务
  async ViewAllTask(params: UserViewAllTask){
    const response =  await axios.post(Userpath.UserViewAllTaskUrl,{
      time : params.time,
      userid: params.userid,
      classname : params.classname,
     
    });
    return response.data;
  },//加载未发布的任务
  async LoadTask(params : UserLoadTask){
    const response = await axios.post(Userpath.UserLoadTaskUrl,{
      userid : params.userid,
      classname : params.classname,
    });
    return response.data;
  },//金币变换
  async CoinChange(params : UserCoinChange){
    const response = await axios.post(Userpath.UserCoinChangeUrl,{
      userid: params.userid,
      coin : params.coin,
    });
    return response.data;
  },//购买商品
  async BuyShopping(params : UserBuyShopping){
    const response = await axios.post(Userpath.UserBuyShoppingUrl,{
      createid: params.createid,
      time: params.time,
      userid:params.userid,
      productid:params.productid
    });
    return response.data;
  },//显示当天的班级总结
  async Comment(params: Comment){
    const response = await axios.post(Userpath.UserViewCommentUrl,{
      classname : params.classname,
      time : params.time
    });
    return response.data;
  },//显示所有个人总结
  async ViewComment_task(taskid : string){
    const response = await axios.post(Userpath.UserViewComment_taskUrl,{
      taskid : taskid,
    });
    return response.data;
  },//显示个人总结的评论
  async ViewOtherComment(taskid : string,userid:string,){
    const response = await axios.post(Userpath.UserViewOtherCommentUrl,{
      taskid:taskid,
      userid: userid,
    });
    return response.data;
  },//提交外部的评论
  async SubmitComment(params:UsersumitComment){
    const response = await axios.post(Userpath.UserSubmitOuterCommentUrl,{
      taskid: params.taskid,
      comment:params.comment,
      commentid : params.commentid,
      userid:params.userid,
      name :params.name
    });
    return response.data;
  },//显示提交外部的评论
  async ViewOuterComment(params:ViewOuterComment){
    const response = await axios.post(Userpath.UserViewOuterCommentUrl,{
      taskid:params.taskid,
      userid : params.userid,
    });
    return response.data;
  },//提交内部评论
  async SubmitInnerComment(params:UsersubmitInnterComment){
    const response = await axios.post(Userpath.UserSubmitInnterCommentUrl,{
      taskid: params.taskid,
      name : params.name,
      other_comment:params.other_comment,
      other_commentid : params.other_commentid,
      comment:params.comment,
      commentid:params.commentid,
      other_commentname : params.other_commentname,
      authorid : params.authorid,
    });
    return response.data;
  },//显示内部评论
  async ViewInnerCommer(params:searchinnerComment){
    const response = await axios.post(Userpath.UserViewInnerCommentUrl,{
      taskid:params.taskid,
      commentid:params.commentid,
      comment : params.comment,
      userid : params.userid,
    });
    return response.data;
  },//举报总结评论
  async WarnComment(params:searchinnerComment){
    const response = await axios.post(Userpath.UserWarnCommentUrl,{
      taskid:params.taskid,
      commentid:params.commentid,
      comment : params.comment,
      userid : params.userid,
      taskstarttime:params.taskstarttime,
      taskovertime:params.taskovertime,
      classname : params.classname,
      location :params.location,
    });
    return response.data;
  },//举报总结
  async WarnSummarize(params: warnsummarize){
    const response = await axios.post(Userpath.UserWarnSummarizeUrl,{
      taskid : params.taskid,
      summarize : params.summarize,
      authorid : params.authorid,
      userid : params.userid,
      taskstarttime:params.taskstarttime,
      taskovertime:params.taskovertime,
      classname :params.classname,
      location: params.location,
    });
    return response.data;
  },//查看金币记录
  async viewCoinRecord(params:{userid:string}){
    const response = await axios.post(Userpath.UserviewCoinRecordUrl,{
      userid:params.userid,
    })
    return response.data;
  },//获得全部通知
  async viewnotice(){
    const response = await axios.post(Userpath.UserViewNoticeUrl)
    return response.data;
  }


}
export {userapi}