import * as Yup from "yup";

export const RegisterSchema = Yup.object().shape({
  name: Yup.string().required("İsim alanı girilmesi zorunludur"),
  surname: Yup.string().required("Soyisim alanı girilmesi zorunludur"),
  email: Yup.string()
    .email("Geçerli bir email giriniz")
    .required("Email alanı girilmesi zorunludur"),
  password: Yup.string()
    .required("Şifre alanı girilmesi zorunludur")
    .min(8, "Şifre en az 8 karakterli olmalı")
    .matches(/[A-Z]/, "Şifre en az 1 büyük harf içermeli")
    .matches(/[a-z]/, "Şifre en az 1 küçük harf içermeli")
    .matches(/[0-9]/, "Şifre en az 1 rakam içermeli")
    .matches(/[!@#$%^&*.]/, "Şifre en az 1 özel karakter içermeli"),
  confirmPassword: Yup.string()
    .required("Şifre tekrarı zorunludur")
    .oneOf([Yup.ref("password")], "Şifreler eşleşmiyor"),
});
