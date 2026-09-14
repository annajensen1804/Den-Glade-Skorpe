import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuthContext } from "../../context/useAuthContext";
import PageHeader from "../../components/pageHeader/PageHeader";
import Button from "../../components/button/Button";
import headerImg from "/headerImg.png";
import styles from "./login.module.css";

const Login = () => {
  const { login } = useAuthContext();
  const navigate = useNavigate();

  // Yup valideringsskema - reglerne for hvad brugeren skal udfylde.
  const schema = yup.object().shape({
    email: yup.string().email("Ugyldig email").required("Email er påkrævet"),
    password: yup.string().required("Adgangskode er påkrævet"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = async (data) => {
    try {
      await login(data);
      toast.success("Du er nu logget ind!");
      // Send brugeren videre til backoffice efter login.
      navigate("/backoffice");
    } catch (error) {
      toast.error(error.message || "Login mislykkedes");
    }
  };

  return (
    <article>
      <PageHeader title='DEN GLADE' subTitle='SKORPE' headerImg={headerImg} />
      <div className='introText'>
        <h3>Log ind på backoffice</h3>
      </div>

      <form className={styles.loginForm} onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor='email'>Email</label>
          <input id='email' type='email' {...register("email")} />
          {errors.email && (
            <span className={styles.error}>{errors.email.message}</span>
          )}
        </div>

        <div>
          <label htmlFor='password'>Adgangskode</label>
          <input id='password' type='password' {...register("password")} />
          {errors.password && (
            <span className={styles.error}>{errors.password.message}</span>
          )}
        </div>

        <Button
          type='submit'
          buttonText={isSubmitting ? "Logger ind..." : "Log ind"}
        />
      </form>
    </article>
  );
};

export default Login;
