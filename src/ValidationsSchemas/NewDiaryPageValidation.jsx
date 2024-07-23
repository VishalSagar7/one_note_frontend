import * as Yup from 'yup'


const YupValidation = Yup.object().shape({
    date: Yup.date()
      .required('Please select a date'),
    title: Yup.string()
      .min(3, 'Title must be at least 3 characters')
      .max(50, 'Title must be less than 50 characters')
      .required('Please give a title'),
    content: Yup.string()
      .min(10, 'Content must be at least 10 characters')
      .max(10000, 'Content must be less than 1000 characters')
      .required('Please write some cotent')
  });

export default YupValidation;