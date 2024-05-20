import { useForm } from "react-hook-form"
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function LoginPage() {

  const { register, handleSubmit, formState: { errors } } = useForm();
  const { signin, errors: signinErrors, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const onSubmit = handleSubmit((data) => {
    signin(data)
    console.log(data)
  })

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/tasks/new')
    }
  }, [isAuthenticated])

  return (
    <div>
{/*       {
        signinErrors.map((error, index) => (
          <div key={index}>
            {error}
          </div>
        ))
      } */}
      <form onSubmit={onSubmit}>
        <input type="email" {...register("email", { required: true })} />
        <input type="password" {...register("password", { required: true })} />
        <button type="submit">
          Login
        </button>
      </form>
      <p>No tienes cuenta? <Link to="/register">Registrate</Link></p>
    </div>
  )
}

export default LoginPage