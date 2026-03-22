import { POSTsignin } from '@/api/authApi';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const navigate = useNavigate();
  const loginin = async () => {
    const username = 'greengo-order@gmail.com';
    const password = 'ggo1234';
    const data = {
      username: username,
      password: password,
    };
    try {
      const res = await POSTsignin(data);
      const { token, expired } = res;
      document.cookie = `ggoToken=${token}; expires=${new Date(expired)}; path=/`;
      alert('恭喜！後台登入成功');
      navigate('/admin');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <p>這是登入頁</p>
      <button type="button" onClick={loginin}>
        登入按鈕
      </button>
    </>
  );
};

export default LoginPage;
