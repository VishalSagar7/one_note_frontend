import { useFormik } from "formik";
import { signupValidation } from "../ValidationsSchemas/LoginValidation";
import { Link } from "react-router-dom";
import { phoneValidation } from "../inputValidations/InputValidations";
import signupbg from '../assets/loginsignupbg.jpg'
import { useNavigate } from "react-router-dom";
import newbg from '../assets/homebg.jpeg'
import { BASE_URL } from "../helper";

const initialValues = {
    name: '',
    email: '',
    phone: '',
    password: '',
    repassword: '',
};



const SignupPage = () => {

    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: initialValues,
        validationSchema: signupValidation,
        onSubmit: async(values) => {
            // console.log(values);

            const response = await fetch(`${BASE_URL}/signup`,{
                method : 'POST',
                headers: {
                    'Content-Type': 'application/json', 
                },
                body : JSON.stringify(values)
            })
            const data = await response.json();
            console.log(data.success);
            if(data.success){
                navigate('/')
            }
            
        },
    });

    const { values, handleChange, handleSubmit, handleBlur, errors, touched } = formik;

    return (
        <div className='h-[100vh] w-[100vw] bg-gray-200 flex'>
            <div className='w-full h-full bg-gray-200 flex justify-center items-center'
             style={{backgroundImage : `url(${newbg})`}}
            >
                <form 
                    className='w-[85%] lg:w-[30%] h-[auto] py-[20px] border shadow-md flex flex-col rounded px-[15px] bg-white'
                    onSubmit={handleSubmit}
                >
                    <h1 className='inline-block text-xl font-semibold text-blue-500'>Signup</h1>

                    <div className='w-full mt-[20px]'>
                        <h1>Enter your name</h1>
                        <input
                            name='name'
                            className="w-full h-[40px] border-b border-b-gray-500 outline-none placeholder:pl-[5px]"
                            placeholder="Enter your Name"
                            value={values.name}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                        {errors.name && touched.name ? <p className="text-sm text-red-500">{errors.name}</p> : null}
                    </div>

                    <div className='w-full mt-[20px]'>
                        <h1>Enter email</h1>
                        <input
                            name='email'
                            className="w-full h-[40px] border-b border-b-gray-500 outline-none placeholder:pl-[5px]"
                            placeholder="Enter your email"
                            value={values.email}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                        {errors.email && touched.email ? <p className="text-sm text-red-500">{errors.email}</p> : null}
                    </div>

                    <div className='w-full mt-[20px]'>
                        <h1>Enter your phone</h1>
                        <input
                            name='phone'
                            className="w-full h-[40px] border-b border-b-gray-500 outline-none placeholder:pl-[5px]"
                            placeholder="Enter your phone"
                            value={values.phone}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            onKeyPress={(event) => phoneValidation(event)}
                        />
                        {errors.phone && touched.phone ? <p className="text-sm text-red-500">{errors.phone}</p> : null}
                    </div>

                    <div className='w-full mt-[20px]'>
                        <h1>Enter password</h1>
                        <input
                            name="password"
                            className="w-full h-[40px] border-b border-b-gray-500 outline-none placeholder:pl-[5px]"
                            placeholder="Enter your password"
                            value={values.password}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                        {errors.password && touched.password ? <p className="text-sm text-red-500">{errors.password}</p> : null}
                    </div>

                    <div className='w-full mt-[20px]'>
                        <h1>Re-enter password</h1>
                        <input
                            name="repassword"
                            className="w-full h-[40px] border-b border-b-gray-500 outline-none placeholder:pl-[5px]"
                            placeholder="Re-enter your password"
                            value={values.repassword}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                        {errors.repassword && touched.repassword ? <p className="text-sm text-red-500">{errors.repassword}</p> : null}
                    </div>

                    <button
                        className='h-[40px] rounded bg-blue-500 mt-[30px] text-white text-lg font-semibold hover:bg-sky-400 active:bg-blue-600'
                        type='submit'
                    >
                        Signup
                    </button>

                    <p className='pt-[20px]'>
                        Already have an account? <Link to={'/'}><span className="hover:underline">Login here</span></Link>
                    </p>
                </form>
            </div>

        </div>
    );
}

export default SignupPage;
