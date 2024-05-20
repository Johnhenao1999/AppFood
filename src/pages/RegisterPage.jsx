import { useForm } from "react-hook-form"
import { useAuth } from "../context/AuthContext";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";


function RegisterPage() {
  const { register, handleSubmit } = useForm()
  const {signup, isAuthenticated, errors: registerErrors} = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if(isAuthenticated) navigate('/tasks/new')
  }, [isAuthenticated])

  const onSubmit = handleSubmit(async (values) => {
    signup(values);
  });

  return (
    <div>
      {
        registerErrors.map((error, index) => (
          <div  key={index}>
            {error}
          </div>
        ))
      }
      <form onSubmit={onSubmit}>
        <input type="text" {...register("username", { required: true })} />
        <input type="email" {...register("email", { required: true })} />
        <input type="password" {...register("password", { required: true })} />
        <button type="submit">
          Register
        </button>
      </form>
    </div>
  )
}

export default RegisterPage