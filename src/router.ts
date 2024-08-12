import { createRouter, createWebHashHistory } from "vue-router";
import Login from "./pages/System/Login";
import Register from "./pages/System/Register";
import FirstFill from "./pages/System/FirstFill";

//用户端
import UserNavigate from "./pages/User/Navigate/UserNavigate.vue";

import UserTask from "./pages/User/UserTask/user-task.vue";
import UserViewUnFinishTask from "./pages/User/UserTask/UserViewUnFinishTask.vue"
import UserViewFinishTask from "./pages/User/UserTask/User-ViewFinishTask.vue";

import UserShopping from "./pages/User/UserShopping/user-shopping.vue";

import UserComment from "./pages/User/UserComment/user-comment.vue";
import UserViewComment from "./pages/User/UserComment/user-ViewComment.vue";
import UserViewOtherComment from "./pages/User/UserComment/user-ViewOtherComment.vue";

import UserClass from "./pages/User/UserClass/user-class.vue";
import UserAddClass from "./pages/User/UserClass/UserAddClass.vue";
import UserAboutClass from "./pages/User/UserClass/UserAboutClass.vue";
import UserCheckClassMember from "./pages/User/UserClass/user-CheckClassMember.vue";
import UserCheckOneSelf from "./pages/User/UserClass/user-CheckOneSelf.vue";
import UserSearchname from "./pages/User/UserClass/user-searchname.vue";

import UserOneself from "./pages/User/UserOneself/user-oneself.vue";
import UserRevieOneself from "./pages/User/UserOneself/userRevieOneself.vue";


//创建者
import CreateNavigate from "./pages/Create/Navigate/create-Navigate.vue";

import CreateTask from "./pages/Create/CreateTask/create-Task.vue";
import CreateTaskPublic from "./pages/Create/CreateTask/create-TaskPublic.vue";
import CreateTaskUnPublic from "./pages/Create/CreateTask/create-TaskUnpublic.vue";
import CreateAddtask from "./pages/Create/CreateTask/create-AddTask.vue";
import CreateModifytask from "./pages/Create/CreateTask/create-ModifyTask.vue";
import CreatePublictask from "./pages/Create/CreateTask/create-PublicTask.vue";
import CreatePublictaskOne from "./pages/Create/CreateTask/create-TaskPublicOne.vue";
import CreateUnpublicViewTask from "./pages/Create/CreateTask/create-UnpublicViewTask.vue";

import CreateShopping from "./pages/Create/CreateShopping/create-shopping.vue";
import AddProduct from "./pages/Create/CreateShopping/create-addproduct.vue";
import ModifyProduct from "./pages/Create/CreateShopping/create-modifyproduct.vue";

import CreateComment from "./pages/Create/CreateComment/create-comment.vue";
import CommentInfor from "./pages/Create/CreateComment/CommentInfor.vue";
import createViewComment from "./pages/Create/CreateComment/create-ViewComment.vue";

import CreateClass from "./pages/Create/CreateClass/create-class.vue";
import CreateAddClass from "./pages/Create/CreateClass/create-addclass.vue";
import CreateCheckClass from "./pages/Create/CreateClass/create-checkclass.vue";
import CreateCheckClassMember from "./pages/Create/CreateClass/create-checkclassmember.vue";
import CreateRequestJoin from "./pages/Create/CreateClass/create-requestjoin.vue";
import CreateCheckOneself from "./pages/Create/CreateClass/Create-CheckOneself.vue";
import CreateSearchName from "./pages/Create/CreateClass/create-SearchName.vue";

import CreateOneself from "./pages/Create/CreateOneself/create-oneself.vue";
import CreateRevise from "./pages/Create/CreateOneself/create-revise.vue";



//管理者
import AuditorNavigate from "./pages/Auditor/Navigate/Auditor-Navigate.vue";

import AuditorNotification from "./pages/Auditor/Auditor-Notification/auditor-Notification.vue";
import AuditorPostNotice from "./pages/Auditor/Auditor-Notification/auditor-Postnotice.vue";
import AuditorViewNotiveInfor from "./pages/Auditor/Auditor-Notification/auditor-ViewNoticeInfor.vue";


import AuditorComment from  "./pages/Auditor/AuditorComment/AuditorComment.vue";

import AuditorAudit from "./pages/Auditor/Auditor-Audit/auditor-Audit.vue";
import AuditorAuditRecoreds from "./pages/Auditor/Auditor-Audit/auditor-AuditRecords.vue";
import AuditorDenounce from "./pages/Auditor/Auditor-Audit/auditor-Denounce.vue";

//测试
import test from "./pages/Test/test.vue";


import test2 from "./pages/Login/Login.vue"



const routes = [
  { path:"/test",component:test},
  { path:"/test2",component:test2},

  { path: "/", component: Login },
  // {path:"/",component:test},
  { path: "/login", component: Login },
  { path: "/register", component: Register },
  { path:"/firstfill",component: FirstFill},



//用户端
  { path:"/userrevise", component : UserRevieOneself},
  { path:"/useraddclass", component : UserAddClass},
  { path:"/useraboutclass", component : UserAboutClass},
  { path:"/userviewunfinishtask",component : UserViewUnFinishTask},
  { path:"/userviewfinishtask",component : UserViewFinishTask},
  { path:"/userviewcomment",component : UserViewComment},
  { path:"/userviewothercomment",component:UserViewOtherComment},
  { path:"/usercheckclassmember", component:UserCheckClassMember},
  { path:"/usercheckoneself",component:UserCheckOneSelf},
  { path:"/usersearchname",component:UserSearchname},
  { path: "/usernavigate", component: UserNavigate,
    children:[
      {
        name:"user",
        path:"/usertask",
        component: UserTask,
      },
      {
        path:"/usershopping",
        component: UserShopping,
     
      },
      {
        path:"/usercomment",
        component: UserComment,
      },
      {
        path:"/userclass",
        component: UserClass,
      },
      {
        path:"/useroneself",
        component: UserOneself,
      }
    
    ],
   },

   //创建者
   {path:"/addproduct",component: AddProduct },
   { path:"/createaddtask",component: CreateAddtask},
   { path:"/createrevise" , component: CreateRevise},
   { path:"/addclass" , component: CreateAddClass},
   { path:"/createcheckclass" , component: CreateCheckClass},
   { path:"/createcheckclassmember" , component: CreateCheckClassMember},
   { path:"/createrequestjoin" , component: CreateRequestJoin},
   { path:"/modifyproduct" , component: ModifyProduct},
   { path:"/checkoneself" , component: CreateCheckOneself},
   { path:"/createmodify", component: CreateModifytask},
   { path:"/createpublictask" , component:CreatePublictask},
   { path:"/createpublictaskone", component: CreatePublictaskOne},
   { path:"/createunpublicviewtask",component:CreateUnpublicViewTask},
   { path:"/commentinfor" , component:CommentInfor},
   { path:"/createviewcomment",component:createViewComment},
   { path:"/createsearchname",component:CreateSearchName},
   {   path: "/createnavigate", component: CreateNavigate,
   children:[
     {
     
       path:"/createtask",
       component: CreateTask,
       children:[
         {
           path:"/createtaskfinsh",
           component: CreateTaskPublic,
         
         },
         {
           path:"/createtaskunfinshed",
           component: CreateTaskUnPublic,
         },
       ]
     },
     {
       path:"/createshopping",
       component: CreateShopping,
    
     },
     {
       path:"/createcomment",
       component: CreateComment,
     },
     {
       path:"/createclass",
       component: CreateClass,
     },
     {
       path:"/createoneself",
       component: CreateOneself,
     }
   
   ],
  },

  //管理者
  { path:"/auditorviewnoticeinfor",component:AuditorViewNotiveInfor},
  { path:"/auditorpostnotice",component: AuditorPostNotice},
  { path:"/auditornavigate", component: AuditorNavigate,
    children:[
      
      {
        path:"/auditorcomment",
        component: AuditorComment,
      },
      {
        path:"/auditiornotification",
        component: AuditorNotification,
      },
     
      {
        path:"/audit",
        component: AuditorAudit,
        children:[
          {
            path:"/auditrecords",
            component: AuditorAuditRecoreds,
          
          },
          {
            path:"/denounce",
            component: AuditorDenounce,
          },
        ]
      },
    ]
  },

  
];

const router = createRouter({
  // 4. 内部提供了 history 模式的实现。为了简单起见，我们在这里使用 hash 模式。
  history: createWebHashHistory(),
  routes, // `routes: routes` 的缩写
});

export default router;
