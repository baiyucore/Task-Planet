import axios from "axios"
import { deltenotice, login, Postnotice, warnarray, publishnotice } from "../Interface/AuditorInterface"
import { Auditorpath } from "./path"
import {  type DateValue} from '@internationalized/date'

const auditorapi={
//发布新通知
async PostNotice(params: Postnotice){
  const responst = await axios.post(Auditorpath.AuditorPostNoticeUrl,{
    noticename : params.noticename,
    noticecompletion: params.noticecompletion,
    noticeid: params.noticeid,
  });
  return responst.data;
},//显示通知
async ViewPostNotice(){
  const responst = await axios.post(Auditorpath.AuditorViewNoticeInforUrl,{});
  return responst.data;
},//删除通知
async RemoveNotice(params:deltenotice){
  const responst = await axios.post(Auditorpath.AuditorRemoveNoticeUrl,{
    noticeid:params.noticeid,
  });
  return responst.data;
},

async test(time :DateValue|undefined){
  const responst = await axios.post(Auditorpath.testUrl,{
    time :time
  });
  return responst.data;
},//登入
async login(params:login){
  const responst = await axios.post(Auditorpath.AuditroLoginUrl,{
    account_id:params.account_id,
    account_password :params.account_password
  })
  return responst.data;
},//举报信息体现
async checkTimeWarn(params:DateValue|undefined){
  const responst = await axios.post(Auditorpath.AuditorCheckTimeWarnUrl,{
    time : params,
  })
  return responst.data;
},//审核结果记录
async WarnRecord(params: warnarray, result: string, time: number){
  const responst = await axios.post(Auditorpath.AuditorWarnRecordsUrl,{
    taskid:params.taskid,
    warnuserid:params.warnuserid,
    warnedcommentid:params.warnedcommentid,
    result :result,
    location:params.location,
    summarize:params.warncomment,
    time:time,
  })
  return responst.data;
},//查看审核记录
async ViewAuditRecord(time :DateValue | undefined ){
  const responst = await axios.post(Auditorpath.AuditorViewauditorrecoredUrl,{
     time:time,
  })
  return responst.data;
},//查看评论
async ViewComment(searchtime:DateValue | undefined){
  const responst = await axios.post(Auditorpath.AudtiorCommentUrl,{
    searchtime:searchtime
  })
  return responst.data;
},//发布通知
async PublishNotice(params:publishnotice){
  const responst = await axios.post(Auditorpath.AuditorPublishNoticeUrl,{
    noticeid:params.noticeid,
    time:params.time,
  })
  return responst.data;
}


}

export {auditorapi}