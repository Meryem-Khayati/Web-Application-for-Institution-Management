import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { countServices } from '../services/countServices';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock, faUser } from '@fortawesome/free-solid-svg-icons';

export default function Login() {
  const [loginData, setLoginData] = useState({
    username: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  let navigate = useNavigate();

  const handleChange = (e) => {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    countServices.login(loginData)
      .then(res => {
        countServices.saveToken(res.data.token);
        const role = countServices.decoderToken().role;
        if (role === "ETUDIANT") {
          navigate("/etudiant");
        } else if (role === "ADMIN") {
          navigate("/dashboard");
        } else {
          navigate("/auth/login");
        }
      })
      .catch(err => {
        setError("Nom utilisateur ou mot de passe incorrect.");
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className='login-container'>
      <div className='cont-login'>
        <div className='login-content'>
          <h1>Login</h1>
          <form onSubmit={handleSubmit} className='login-form'>
            {error && <div className='error-message'>{error}</div>}
            <label className='label-login-form'>Nom utilisateur</label>
            <div className='div-input'>
              <input
                type='email'
                name='username'
                value={loginData.username}
                onChange={handleChange}
                required
              />
              <FontAwesomeIcon icon={faUser} className='icon-login' />
            </div>
            <label className='label-login-form'>Mot de passe</label>
            <div className='div-input'>
              <input
                type='password'
                name='password'
                value={loginData.password}
                onChange={handleChange}
                required
              />
              <FontAwesomeIcon icon={faLock} className='icon-login' />
            </div>
            <button className='btn-login' type='submit' disabled={loading}>
              {loading ? 'Connexion...' : 'Connexion'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
