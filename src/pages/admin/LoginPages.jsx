import { POSTsignin } from '@/api/authRequestApi';
import { Buttons } from '@/components/shared/Buttons';
import { useNavigate } from 'react-router-dom';
import { Camera } from 'lucide-react';

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
      <div className="flex pb-2">
        <Buttons type="button" variant="default" size="lg" onClick={loginin}>
          登入按鈕
        </Buttons>
        <Buttons type="button" variant="outline" size="lg" onClick={loginin}>
          登入按鈕
        </Buttons>
        <Buttons type="button" variant="secondary" size="lg" onClick={loginin}>
          登入按鈕
        </Buttons>
        <Buttons type="button" variant="ghost" size="lg" onClick={loginin}>
          登入按鈕
        </Buttons>
      </div>
      <div className="flex pb-2">
        <Buttons type="button" variant="default" size="md" onClick={loginin}>
          登入按鈕
        </Buttons>
        <Buttons type="button" variant="outline" size="md" onClick={loginin}>
          登入按鈕
        </Buttons>
        <Buttons type="button" variant="secondary" size="md" onClick={loginin}>
          登入按鈕
        </Buttons>
        <Buttons type="button" variant="ghost" size="md" onClick={loginin}>
          登入按鈕
        </Buttons>
      </div>
      <div className="flex pb-2">
        <Buttons type="button" variant="default" size="sm" onClick={loginin}>
          登入按鈕
        </Buttons>
        <Buttons type="button" variant="outline" size="sm" onClick={loginin}>
          <Camera /> 登入按鈕 <Camera />
        </Buttons>
        <Buttons type="button" variant="secondary" size="sm" onClick={loginin}>
          登入按鈕
        </Buttons>
        <Buttons type="button" variant="ghost" size="sm" onClick={loginin}>
          登入按鈕
        </Buttons>
      </div>
      <div className="flex">
        <Buttons type="button" variant="outline" size="iconLg" onClick={loginin}>
          <Camera />
        </Buttons>
        <Buttons type="button" variant="outline" size="iconMd" onClick={loginin}>
          <Camera />
        </Buttons>
        <Buttons type="button" variant="outline" size="iconSm" onClick={loginin}>
          <Camera />
        </Buttons>
      </div>
    </>
  );
};

export default LoginPage;
