"use client";
import Link from "next/link";
import Image from "next/image";
import { FormikHelpers, useFormik } from "formik";
import LoginImage from "@/public/images/loginImage.jpg";
import { LoginType } from "@/types/type";
import { LoginSchema } from "@/schema/LoginSchema";
import InputField from "@/components/ui/InputField";
import { useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { loginStart, loginSuccess } from "@/store/slices/authSlice";
import { axiosClient, setAuthorizationHeader } from "@/api/axiosClient";
import axios from "axios";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();
  const onSubmit = async (
    values: LoginType,
    actions: FormikHelpers<LoginType>,
  ) => {
    dispatch(loginStart());
    try {
      const response = await axiosClient.post(
        "/auth/login",
        {
          email: values.email,
          password: values.password,
        },
        {
          withCredentials: true,
        },
      );
      console.log(response);
      const token = response.data.token;
      const user = response.data.user;
      dispatch(
        loginSuccess({
          user: response.data.user,
          token: response.data.token,
        }),
      );
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("token", token);
      console.log(user);
      if (response.status === 200) {
        setAuthorizationHeader({ isLoggedIn: true, token });
        axios.defaults.headers["Authorization"] =
          `Bearer ${response.data.token}`;
        console.log("Giriş başarılı");
        console.log(response.data.user);
        console.log(response.data.token);
        dispatch(
          loginSuccess({
            user: response.data.user,
            token: response.data.token,
          }),
        );
        router.push("/talepler");
      }
    } catch (error) {}
  };
  const formik = useFormik<LoginType>({
    initialValues: {
      id: 0,
      email: "",
      password: "",
    },
    onSubmit,
    validationSchema: LoginSchema,
  });

  const registerFormItems = [
    {
      id: 1,
      label: "E-posta",
      name: "email",
      value: formik.values.email,
      error: formik.errors.email,
      touched: formik.touched.email,
      onChange: formik.handleChange("email"),
      onBlur: formik.handleBlur("email"),
    },
    {
      id: 2,
      label: "Şifre",
      name: "password",
      value: formik.values.password,
      error: formik.errors.password,
      touched: formik.touched.password,
      onChange: formik.handleChange("password"),
      onBlur: formik.handleBlur("password"),
    },
  ];
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 items-center gap-4">
      <div className="w-full flex justify-center">
        <Image
          src={LoginImage}
          alt="login-image"
          className="w-full max-w-xs sm:max-w-xs md:max-w-xs h-auto object-contain"
        />
      </div>
      <div className="flex flex-col gap-2">
        <h1 className="text-xl font-semibold">Giriş Yap</h1>
        <span className="text-xs text-gray-600 opacity-60">
          Devam etmek için lütfen giriş yapınız !
        </span>
        <form className="flex flex-col gap-2" onSubmit={formik.handleSubmit}>
          <div className="grid grid-cols-1  gap-2">
            {registerFormItems.map((item) => (
              <div key={item.id} className="flex flex-col gap-0.5 ">
                <label htmlFor="" className="text-sm font-medium">
                  {item.label}
                </label>
                <div className="relative">
                  <InputField
                    name={item.name}
                    value={item.value}
                    onChange={item.onChange}
                    onBlur={item.onBlur}
                    type={
                      item.name === "password" && !showPassword
                        ? "password"
                        : "text"
                    }
                  />
                  {item.name === "password" && (
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-2 top-1/2 transform -translate-y-1/2"
                    >
                      {showPassword ? (
                        <FiEyeOff size={20} />
                      ) : (
                        <FiEye size={20} />
                      )}
                    </button>
                  )}
                </div>
                <span className="text-xs text-red-900">
                  {item.touched && item.error ? item.error : ""}
                </span>
              </div>
            ))}
          </div>
          <button
            type="submit"
            className="text-md mt-2 font-semibold self-center border bg-[#4264D0] transition-all ease-in-out duration-700 w-full text-white p-2 rounded-md hover:bg-white hover:text-[#4264D0] cursor-pointer"
          >
            Giriş Yap
          </button>
        </form>
        <div className="mt-3 text-center text-xs text-gray-600">
          Hesabın yok mu ?{" "}
          <Link
            href="/uye-ol"
            className="text-[#4264D0] font-semibold hover:underline"
          >
            Üye Ol
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
