import * as Yup from 'yup';

export const getFormValidation = () => {
  const FormSchema = Yup.object().shape({
    email: Yup.string()
      .email(`L'email est obligatoire`)
      .required(`L'adresse email est obligatoire.`),
    password: Yup.string().required(`Le mot de passe est obligatoire.`)
  });

  return FormSchema;
};
