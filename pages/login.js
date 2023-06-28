import React, { useState } from 'react';
import { useRouter } from 'next/router';


const Login = () => {
  const [email, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleSignIn = () => {
    // Kullanıcı adı ve parola bilgilerini kontrol edin veya gerektiği gibi işleyin
    if (email === 'admin' && password === '123456') {
      console.log('Giriş yapıldı');
      router.push('/home'); // Ana sayfaya yönlendirme
    } else {
      alert('Kullanıcı adı veya şifre hatalı');
    }
  };

  const handleResetPassword = () => {
    // Burada reset password linkine tıklandığında yapılacak işlemleri tanımlayabilirsiniz.
  };

  return (
    <div className='genelContainer'>
        <div className='formContainer'>
            <div className='logoContainer'>
                <h1 className='brandName'>MANAGE COURSES</h1>
            </div>
            <div className='informationContainer'>
                <h2>SIGN IN</h2>
                <p>Enter your credentials to access your account</p>
            </div>
            <div className='inputContainer'>
                <label htmlFor="email">Email</label>
                <input
                type="text"
                id="username"
                value={email}
                onChange={(e) => setUsername(e.target.value)}
                />
            </div>
            <div className='inputContainer'>
                <label htmlFor="password">Password</label>
                <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                />
            </div>
            <button className='signInBtn' onClick={handleSignIn}>SIGN IN</button>
            <p className='forgot'>
                Forgot your password?  {' '}
                <a className = 'resetPassword'href="#" onClick={handleResetPassword}>
                Reset Password
                </a>
            </p>
        </div>
    </div>
  );
};

export default Login;
