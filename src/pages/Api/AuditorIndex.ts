import axios from "axios"
import { Postnotice } from "../Interface/AuditorInterface"
import { Auditorpath } from "./path"


const auditorapi={
//发布新通知
async PostNotice(params: Postnotice){
  const responst = await axios.post(Auditorpath.AuditorPostNoticeUrl,{
    noticename : params.noticename,
    noticecompletion: params.noticecompletion,
    noticetime: params.noticetime,
    noticeif: params.noticeid,
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

}

export {auditorapi}