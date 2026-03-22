import { POSTlogout } from '@/api/authRequestApi';
import { useNavigate } from 'react-router-dom';

const AdminLayout = () => {
  const navigate = useNavigate();

  const logout = async () => {
    try {
      await POSTlogout();
      document.cookie = 'ggoToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
      alert('恭喜！後台登出成功');
      navigate('/admin/login');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <p>後台側邊欄</p>
      <button type="button" onClick={logout}>
        登出
      </button>
    </>
  );
};

export default AdminLayout;
