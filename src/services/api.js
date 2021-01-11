import router from "@/router";
import Axios from "axios";


const isLoggedIn = () => {
  let token = localStorage.getItem('accessToken');
  return token != null;
};

const login = async check_user_pass => {
  const url = `${process.env.VUE_APP_API_URL}/allmember/login`;
  let result = await Axios.post(url, check_user_pass);
  //console.log(result);
  if (result.data.response == "OK") {
    let Position = result.data.Data[0].Position;
    localStorage.setItem('username', check_user_pass.username);
    localStorage.setItem('accessToken', result.data.accessToken);
    localStorage.setItem('member_ID', result.data.Data[0].member_ID);
    localStorage.setItem('mem_Citizenid', result.data.Data[0].mem_Citizenid);
    localStorage.setItem('FName', result.data.Data[0].FName);
    localStorage.setItem('LName', result.data.Data[0].LName);
    localStorage.setItem('Position', result.data.Data[0].Position);
    localStorage.setItem('profile_img', result.data.Data[0].profile_img);
    localStorage.setItem('Class', result.data.Data[0].Class);
    localStorage.setItem('Classroom', result.data.Data[0].Classroom);
    //console.log(localStorage.getItem('Position'));
    if(Position == "librarian"){
        router.push("/Librarian_Menu");
        window.location.reload();
    }else if (Position == "admin"){
        router.push("/Admin_Menu");
        window.location.reload();
    }else if (Position == "personnel" || Position == "student"){
        router.push("/Student_Personnel_Menu");
        window.location.reload();
    }
    return true;
  } else {
    alert("ชื่อผู้ใช้งานหรือรหัสผ่านไม่ตรงกันไม่สามารถเข้าใช้งานได้")
    return false;
  }
};

  const logoff = () => {
    localStorage.removeItem('username');
    localStorage.removeItem('accessToken');
    localStorage.removeItem('member_ID');
    localStorage.removeItem('mem_Citizenid');
    localStorage.removeItem('FName');
    localStorage.removeItem('LName');
    localStorage.removeItem('Position');
    localStorage.removeItem('profile_img');
    localStorage.removeItem('Class');
    localStorage.removeItem('Classroom');
    router.push("/LoginUsers");

  };

  export default{
    isLoggedIn,
    login,
    logoff
  }