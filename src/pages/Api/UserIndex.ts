import axios from "axios";
import {Userpath} from "./path";
import { UserApplyformember, UserBuyShopping, UserCoinChange, UserLoadTask, UserReviseOneself, UserSumitTask, UserViewAllTask, Userid } from "../Interface/UserInterface";




const userapi = {
  //显示个人信息
  async viewoneself(params : Userid){
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
    });
    return response.data;
  },//在商城中商品
  async viewshopping(params : string){
    const response = await axios.post(Userpath.UserViewShoppingUrl,{
      createid : params,
    });
    return response.data;
  },//搜索班级
  async searchclass(ClassUserInvitecode : string){
    const response = await axios.post(Userpath.UserSearchClassUrl,{
      userinvitecode : ClassUserInvitecode,
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
  },//提交任务
  async SubmitTask(params : UserSumitTask){
    const response = await axios.post(Userpath.UserSubmitTaskUrl,{
      taskid : params.taskid,
      coin : params.coin,
      summarize : params.summarize,
      rewardselect:params.rewardselect,
      userid : params.userid,
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
      totalnumber: params.totalnumber,
      createid: params.createid,

    });
    return response.data;
  },
}
export {userapi}