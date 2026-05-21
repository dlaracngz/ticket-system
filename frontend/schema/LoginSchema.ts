import * as Yup from "yup";

export const LoginSchema = Yup.object().shape({
  email: Yup.string().required("Email alanı girilmesi zorunludur"),
  password: Yup.string().required("Şifre alanı girilmesi zorunludur"),
});
