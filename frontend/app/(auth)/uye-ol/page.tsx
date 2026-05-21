"use client";
import Link from "next/link";
import Image from "next/image";
import { FormikHelpers, useFormik } from "formik";
import RegisterImage from "@/public/images/registerImage2.jpg";
import { RegisterType } from "@/types/type";
import { RegisterSchema } from "@/schema/RegisterSchema";
import InputField from "@/components/ui/InputField";
import { useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import {
  registerFail,
  registerStart,
  registerSuccess,
} from "@/store/slices/registerSlice";
import { axiosClient } from "@/api/axiosClient";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();
  const onSubmit = async (
    values: RegisterType,
    actions: FormikHelpers<RegisterType>,
  ) => {
    dispatch(registerStart());
    try {
      const response = await axiosClient.post(
        "/auth/register",
        {
          name: values.name,
          surname: values.surname,
          email: values.email,
          password: values.password,
          confirmPassword: values.confirmPassword,
        },
        { withCredentials: true },
      );
      dispatch(registerSuccess(response.data));
      console.log(response);
      router.push("/giris-yap");
    } catch (error) {
      dispatch(registerFail("Hata oluştu"));
    }
  };
  const formik = useFormik<RegisterType>({
    initialValues: {
      id: 0,
      name: "",
      surname: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    onSubmit,
    validationSchema: RegisterSchema,
  });

  const registerFormItems = [
    {
      id: 1,
      label: "Adı",
      name: "name",
      value: formik.values.name,
      error: formik.errors.name,
      touched: formik.touched.name,
      onChange: formik.handleChange("name"),
      onBlur: formik.handleBlur("name"),
    },
    {
      id: 2,
      label: "Soyadı",
      name: "surname",
      value: formik.values.surname,
      error: formik.errors.surname,
      touched: formik.touched.surname,
      onChange: formik.handleChange("surname"),
      onBlur: formik.handleBlur("surname"),
    },
    {
      id: 3,
      label: "E-posta",
      name: "email",
      value: formik.values.email,
      error: formik.errors.email,
      touched: formik.touched.email,
      onChange: formik.handleChange("email"),
      onBlur: formik.handleBlur("email"),
    },
    {
      id: 4,
      label: "Şifre",
      name: "password",
      value: formik.values.password,
      error: formik.errors.password,
      touched: formik.touched.password,
      onChange: formik.handleChange("password"),
      onBlur: formik.handleBlur("password"),
    },
    {
      id: 5,
      label: "Şifre Tekrar",
      name: "confirmPassword",
      value: formik.values.confirmPassword,
      error: formik.errors.confirmPassword,
      touched: formik.touched.confirmPassword,
      onChange: formik.handleChange("confirmPassword"),
      onBlur: formik.handleBlur("confirmPassword"),
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 items-center gap-4">
      <div className="w-full flex justify-center">
        <Image
          src={RegisterImage}
          alt="login-image"
          className="w-full max-w-xs sm:max-w-xs md:max-w-xs h-auto object-contain"
        />
      </div>
      <div className="flex flex-col gap-2">
        <h1 className="text-xl font-semibold">Üye Ol</h1>
        <span className="text-xs text-gray-600 opacity-60">
          Devam etmek için lütfen üye olunuz!
        </span>
        <form className="flex flex-col gap-2" onSubmit={formik.handleSubmit}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-2 gap-x-4">
            {registerFormItems.map((item) => (
              <div key={item.id} className="flex flex-col gap-0.5">
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
                      item.name === "password"
                        ? showPassword
                          ? "text"
                          : "password"
                        : item.name === "confirmPassword"
                          ? showConfirmPassword
                            ? "text"
                            : "password"
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
                  {item.name === "confirmPassword" && (
                    <button
                      type="button"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      className="absolute right-2 top-1/2 -translate-y-1/2"
                    >
                      {showConfirmPassword ? (
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
            Üye Ol
          </button>
        </form>
        <div className="mt-3 text-center text-xs text-gray-600">
          Zaten üye oldunuz mu ?{" "}
          <Link
            href="/giris-yap"
            className="text-[#4264D0] font-semibold hover:underline"
          >
            Giriş yap
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
