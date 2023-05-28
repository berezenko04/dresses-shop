import { useForm, SubmitHandler } from "react-hook-form";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "@/axios";

//styles
import styles from "./RegistrationForm.module.scss";

//components
import AuthField from "../AuthField";
import Button from "../Button";

type FormValues = {
  fullName: string;
  email: string;
  password: string;
  repeatPassword: string;
  check: boolean;
};

const RegistrationForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<FormValues>();

  const [error, setError] = useState("");

  const navigate = useNavigate();

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    try {
      const { fullName, ...restData } = data;
      const [name, lastName] = fullName.split(" ");
      const newData = {
        name,
        lastName, 
        ...restData
      }

      await axios.post("/auth/register", newData);
      navigate("/Sandrela/login");
    } catch (err: any) {
      setError(err?.response.data.message);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
      <div className={styles.form__wrapper}>
        <div className={styles.form__block}>
          <AuthField
            type="text"
            title="Full Name"
            {...register("fullName", {
              required: true,
              minLength: 8,
              maxLength: 50,
              pattern: {
                value: /[a-zA-Zа-яА-Я]+ [a-zA-Zа-яА-Я]+/,
                message: "Invalid full name."
              }
            })}
            placeholder="Enter full name"
            className={errors.fullName ? styles.error : ""}
            error={Boolean(errors.fullName)}
          />
          {errors.fullName?.type === "required" && (
            <span>Full name is required.</span>
          )}
          {errors.fullName?.type === "minLength" && (
            <span>Full name must be at least 8 characters.</span>
          )}
          {errors.fullName?.type === "maxLength" && (
            <span>Full name must be less than 50 characters.</span>
          )}
          {errors.fullName?.type === "pattern" && (
            <span>Invalid full name.</span>
          )}
        </div>

        <div className={styles.form__block}>
          <AuthField
            type="text"
            title="Email"
            {...register("email", { required: true, pattern: /^\S+@\S+$/i })}
            placeholder="Enter email"
            className={errors.email ? styles.error : ""}
            error={Boolean(errors.email)}
            onInput={() => setError("")}
          />
          {errors.email?.type === "required" && <span>Email is required.</span>}
          {errors.email?.type === "pattern" && (
            <span>Invalid email address.</span>
          )}
          {error && <span>{error}</span>}
        </div>

        <div className={styles.form__block}>
          <AuthField
            type="password"
            title="Password"
            {...register("password", {
              required: true,
              minLength: 8,
              maxLength: 32,
            })}
            placeholder="Enter password"
            className={errors.password ? styles.error : ""}
            error={Boolean(errors.password)}
          />
          {errors.password?.type === "required" && (
            <span>Password is required.</span>
          )}
          {errors.password?.type === "minLength" && (
            <span>Password must be at least 8 characters.</span>
          )}
          {errors.password?.type === "maxLength" && (
            <span>Password must be less than 32 characters.</span>
          )}
        </div>

        <div className={styles.form__block}>
          <AuthField
            type="password"
            title="Repeat Password"
            {...register("repeatPassword", {
              required: true,
              validate: (value) => value === watch("password"),
            })}
            placeholder="Repeat your password"
            className={errors.repeatPassword ? styles.error : ""}
            error={Boolean(errors.repeatPassword)}
          />
          {errors.repeatPassword?.type === "required" && (
            <span>Repeat password is required.</span>
          )}
          {errors.repeatPassword?.type === "validate" && (
            <span>Passwords do not match.</span>
          )}
        </div>
      </div>
      <Button size="sm" theme="primary" type="submit">
        Create Account
      </Button>
      <p>
        Already have account? <Link to="/Sandrela/login">Log in</Link>
      </p>
    </form>
  );
};

export default RegistrationForm;
