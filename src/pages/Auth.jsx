import { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
function Auth() {
    const [mode, setMode] = useState('signup');
    const {register, handleSubmit, formState: {errors}} = useForm();
    const { signUp, login } = useAuth();
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    function onSubmit(data) {
        setError(null);
        let result = "";
        if (mode === 'signup') {
            result = signUp(data.email, data.password);
        }
        else {
            result = login(data.email, data.password);
        }
        if (result.success === true) {
            navigate("/");
        }
        else {
            setError(result.error);
        }
    }

    return (
        <div className="page">
            <div className="container">
                <div className="auth-container">
                    <h1 className="page-title">
                        { mode === 'signup' ? 'Sign Up' : 'Login' }
                    </h1>
                    <form action="" className="auth-form" onSubmit={handleSubmit(onSubmit)}>
                        {error && <div className='error-message'>{error}</div>}
                        <div className='form-group'>
                            <label className='form-label' htmlFor="email">
                            Email
                            </label>
                            <input className='form-input'
                             type="email"
                             id="email"
                             {...register('email', {required: 'Email is Required'})}/>
                             {errors.email && <span className='form-error'>{errors.email.message}</span>}
                        </div>
                        <div className='form-group' >
                            <label className='form-label' htmlFor="password">
                            Password
                            </label>
                            <input className='form-input' type="password" id="password"
                            {...register('password', {required: 'Password is Required',
                                minLength: {
                                    value: 6,
                                    message: "Password must be at least 6 characters."
                                },
                                maxLength: {
                                    value: 12,
                                    message: "Password must be less than 12 characters."
                                }
                            })}/>
                            {errors.password && (<span className='form-error'>{errors.password.message}</span>)}
                        </div>
                        <button type='submit' className="btn-primary btn-large btn">
                            { mode === 'signup' ? 'Sign Up' : 'Login' }
                        </button>
                    </form>
                    <div className="auth-switch">
                        {mode === "signup" ? (
                            <p>
                             Already have an account?{" "}
                            <span className="auth-link" onClick={() => setMode("login")}>
                             Login
                            </span>
                            </p>
                            ) : (
                            <p>
                            {" "}
                            Don't have an account?{" "}
                            <span className="auth-link" onClick={() => setMode("signup")}>
                            Sign Up
                            </span>
                            </p>
                            )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Auth;