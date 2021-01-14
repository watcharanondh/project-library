import Vue from "vue";
import VueRouter from "vue-router";
import Dashboard from "@/views/Dashboard.vue";
import LoginUsers from "@/views/LoginUsers.vue";
import Librarian_Menu from "@/views/Librarian_Menu.vue";
import Admin_Menu from "@/views/Admin_Menu.vue";
import Student_Personnel_Menu from "@/views/Student_Personnel_Menu.vue";
import Manage_Resources from "@/views/Manage_Resources.vue";
import CreateTemplate from "@/views/CreateTemplate.vue";
import AddBook from "@/views/AddBook.vue";
import Editresource from "@/views/Editresource.vue";
import Member_Management from "@/views/Member_Management.vue";
import Report from "@/views/Report.vue";
import Edit_Personal_Information from "@/views/Edit_Personal_Information.vue";
import Borrow_return from "@/views/Borrow_return.vue";
import Member_BorrowAndReturn from "@/views/Member_BorrowAndReturn.vue";
import Member_FineReceipt from "@/views/Member_FineReceipt.vue";

import SearchBooklist from "@/views/SearchBooklist.vue";
import InformationBooks from "@/views/informationBooks.vue";

Vue.use(VueRouter);

const routes = [
  // หน้าหลัก
  {
    path: "/Dashboard",
    name: "Dashboard",
    component: Dashboard,
  },

  //หน้าค้นหาหนังสือ
  {
    path: "/SearchBooklist",
    name: "SearchBooklist",
    component: SearchBooklist,
  },

  //ข้อมูลหนังสือ
  {
    path: "/InformationBooks",
    name: "InformationBooks",
    component: InformationBooks,
  },

  //ระบบLogin
  {
    path: "/LoginUsers",
    name: "LoginUsers",
    component: LoginUsers,
  },
  {
    path: "/Librarian_Menu",
    name: "Librarian_Menu",
    component: Librarian_Menu,
  },
  {
    path: "/Admin_Menu",
    name: "Admin_Menu",
    component: Admin_Menu,
  },
  {
    path: "/Student_Personnel_Menu",
    name: "Student_Personnel_Menu",
    component: Student_Personnel_Menu,
  },

  //จัดการข้อมูลสารสนเทศ
  {
    path: "/Manage_Resources",
    name: "Manage_Resources",
    component: Manage_Resources,
  },

  // เพิ่มทรัพยากร
  {
    path: "/AddBook",
    name: "AddBook",
    component: AddBook,
  },

  // สร้าง Template
  {
    path: "/CreateTemplate",
    name: "CreateTemplate",
    component: CreateTemplate,
  },

  //แก้ไขข้อมูลสารสนเทศ
  {
    path: "/Editresource",
    name: "Editresource",
    component: Editresource,
  },

  //ระบบสมาชิก
  {
    path: "/Member_Management",
    name: "Member_Management",
    component: Member_Management,
  },

  //ออกรายงาน
  {
    path: "/Report",
    name: "Report",
    component: Report,
  },

  //แก้ไขข้อมูลส่วนตัว
  {
    path: "/Edit_Personal_Information",
    name: "Edit_Personal_Information",
    component: Edit_Personal_Information,
  },

  //สร้างรายการยืมคืนของ lib
  {
    path: "/Borrow_return",
    name: "Borrow_return",
    component: Borrow_return,
  },

  //รายการยืมคืนและค่าปรับของสมาชิก
  {
    path: "/Member_BorrowAndReturn",
    name: "Member_BorrowAndReturn",
    component: Member_BorrowAndReturn,
  },
  {
    path: "/Member_FineReceipt",
    name: "Member_FineReceipt",
    component: Member_FineReceipt,
  },

  {
    path: "/",
    redirect: "/Dashboard",
  },
  {
    path: "*",
    redirect: "/Dashboard",
  },

  // {
  //   path: '/about',
  //   name: 'About',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
