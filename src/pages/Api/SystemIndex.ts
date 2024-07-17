import axios from "axios";
import {Systempath} from "./path";
import { accountinfor, firstfill } from "../Interface/SystemInterfact";

const systemapi = {
  async login(params : accountinfor){
    const response = await axios.post(Systempath.loginUrl,{
      account_id : params.account_id,
      account_password : params.account_passowrd,
    });
    return response.data;
  },
  async register(params : accountinfor){
    const response = await axios.post(Systempath.registerUrl,{
      account_id : params.account_id,
      account_password : params.account_passowrd,
    });
    return response.data;
  },
  async firstfill(params : firstfill){
    const response = await axios.post(Systempath.firstfillUrl,{
      account_id : params.account_id,
      account_identites:params.account_identites,
      account_name:params.account_name,
      account_sex:params.account_sex,
    });
    return response.data;
  },
}


export {systemapi}