import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import {
  Button,
  Card,
  FormControl,
  InputPassword,
  InputText,
  LayoutOne,
} from "upkit";
import { login } from "../../api/auth";
import StoreLogo from "../../components/StoreLogo";
import { userLogin } from "../../features/Auth/actions";
import { rules } from "./validation";

const statuslist = {
  idle: "idle",
  process: "process",
  success: "success",
  error: "error",
};

export default function Login() {
  const { register, handleSubmit, errors, setError } = useForm();
  const [status, setStatus] = useState(statuslist.idle);
  const dispatch = useDispatch();
  const history = useHistory();

  const onSubmit = async ({ email, password }) => {
    setStatus(statuslist.process);

    let { data } = await login(email, password);

    if (data.error) {
      setError("password", {
        type: "invalidCredential",
        message: data.message,
      });
      setStatus(statuslist.error);
    } else {
      let { user, token } = data;
      dispatch(userLogin(user, token));
      history.push("/");
    }
    setStatus(statuslist.success);
  };
  return (
    <LayoutOne>
      <br />
      <Card color="white">
        <div className="text-center mb-5">
          <StoreLogo />
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormControl errorMessage={errors.email?.message}>
            <InputText
              placeholder="email"
              fitContainer
              name="email"
              ref={register(rules.email)}
            />
          </FormControl>

          <FormControl errorMessage={errors.password?.message}>
            <InputPassword
              placeholder="password"
              fitContainer
              name="Password"
              ref={register(rules.password)}
            />
          </FormControl>
          <Button
            size="large"
            fitContainer
            disabled={status === "process"}
          ></Button>
        </form>

        <div className="text-center mt-2">
          Belum punya akun?{" "}
          <Link to="/register">
            <b>Daftar sekarang.</b>
          </Link>
        </div>
      </Card>
    </LayoutOne>
  );
}
