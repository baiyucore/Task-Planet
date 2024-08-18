import axios from "axios"
import { login, Postnotice, warnarray } from "../Interface/AuditorInterface"
import { Auditorpath } from "./path"
import {  type DateValue} from '@internationalized/date'

const auditorapi={
//发布新通知
async PostNotice(params: Postnotice){
  const responst = await axios.post(Auditorpath.AuditorPostNoticeUrl,{
    noticename : params.noticename,
    noticecompletion: params.noticecompletion,
    noticetime: params.noticetime,
    noticeid: params.noticeid,
  });
  return responst.data;
},//显示通知
async ViewPostNotice(){
  const responst = await axios.post(Auditorpath.AuditorViewNoticeInforUrl,{});
  return responst.data;
},//删除通知
async RemoveNotice(noticeid : string){
  const responst = await axios.post(Auditorpath.AuditorRemoveNoticeUrl,{
    noticeid:noticeid,
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
},//
async WarnRecord(params:warnarray){
  const responst = await axios.post(Auditorpath.AuditorWarnRecordsUrl,{
    taskid:params.taskid,
    warnuserid:params.warnuserid,
    warnedcommentid:params.warnedcommentid,
    
  })
}


}

export {auditorapi}