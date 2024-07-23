import * as Yup from 'yup'


export const loginValidation = Yup.object().shape({
    email : Yup.string().email().required("Email is required"),
    password : Yup.string().required("password is required")
})


export const signupValidation = Yup.object({
    
    name: Yup.string()
      .min(2, 'Name must be at least 2 characters')
      .required('Name is required'),
    email: Yup.string()
      .email('Invalid email address')
      .required('Email is required'),
    phone: Yup.string()
      .matches(
        /^(\+\d{1,3}[- ]?)?\d{10}$/,
        'Phone number is not valid'
      )
      .required('Phone number is required'),
    password: Yup.string()
      .min(6, 'Password must be at least 8 characters')
      .required('Password is required'),
    repassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Passwords must match')
      .required('Confirm Password is required'),
  });


  