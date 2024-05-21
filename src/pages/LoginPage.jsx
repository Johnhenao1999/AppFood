import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../loginPage.css";

function LoginPage() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { signin, errors: signinErrors, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const onSubmit = handleSubmit((data) => {
    signin(data);
    console.log(data);
  }); 

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/tasks/new');
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="login-container">
      <form onSubmit={onSubmit} className="login-form">
        <input type="email" {...register("email", { required: true })} placeholder="Correo electrónico" />
        {errors.email && <span className="error-message">Este campo es requerido</span>}
        <input type="password" {...register("password", { required: true })} placeholder="Contraseña" />
        {errors.password && <span className="error-message">Este campo es requerido</span>}
        <button type="submit">
          Iniciar sesión
        </button>
      </form>
      {signinErrors && <div className="error-message">{signinErrors}</div>}
      <p className="register-link">¿No tienes cuenta? <Link to="/register">Regístrate</Link></p>
    </div>
  );
}

export default LoginPage;
