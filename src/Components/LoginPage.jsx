import { useFormik } from "formik";
import { loginValidation } from "../ValidationsSchemas/LoginValidation";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import siginsignupbg from "../assets/loginsignupbg.jpg"
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { addUser, removeUser } from "../redux/actions";
import newbg from '../assets/homebg.jpeg'
import { BASE_URL } from "../helper";


const initialValues = {
    email : '',
    password : ''
}

const LoginPage = () => {

    const dispatch = useDispatch()

    const navigate = useNavigate();

    const [userNotFoundError, setUserNotFoundError] = useState(null)

    const Formik = useFormik({
        initialValues : initialValues,
        validationSchema : loginValidation,
        onSubmit : async(values)=>{
            const response = await fetch(`${BASE_URL}/login`,{
                method : 'POST',
                headers : {
                    'Content-Type': 'application/json',
                },
                body : JSON.stringify(values)
            })

            const data = await response.json();
            console.log(data);
            console.log(data.success);
            if(data.success){
                console.log(data);
                dispatch(addUser(data.storedDocument))
                navigate('/home')
            }
            setUserNotFoundError(data.message)
            console.log(userNotFoundError);
        }
    })

    const {values,handleChange,handleSubmit,handleBlur,errors,touched} = Formik


    useEffect(() => {
        dispatch(removeUser())
    })

    return (
        <div className='h-[100vh] w-[100vw] bg-gray-200 flex'>

            <div className='w-full h-full bg-gray-200 flex justify-center items-center'
            style={{backgroundImage : `url(${newbg})`}}
            >

                <form 
                    className='w-[85%] lg:w-[30%] h-[auto] py-[20px] border shadow-md flex flex-col rounded px-[15px] bg-white'
                    onSubmit={(e)=>handleSubmit(e)}
                >
                    <h1 className='inline-block text-xl font-semibold text-blue-500'>Login</h1>
                    <div className='w-full mt-[20px]'>
                        <h1>Enter email</h1>
                        <input
                            name ='email'
                            className="w-full h-[40px] border-b border-b-gray-500 outline-none placeholder:pl-[5px]"
                            placeholder="Enter your email"
                            value={values.email}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                        {errors.email && touched.email ? <p className="text-sm text-red-500">{errors.email}</p> : null}
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

                    {userNotFoundError && <p className="text-red-500">{userNotFoundError}</p>}

                    <button
                        className='h-[40px] rounded bg-blue-500 mt-[30px] text-white text-lg font-semibold hover:bg-sky-400 active:bg-blue-600'
                        type='submit'
                    >
                        Log In
                    </button>

                    <p className='pt-[20px]'>
                        New user? <Link to={"/signup"}><span className=" hover:underline">create account</span></Link>
                    </p>

                </form>

            </div>


        </div>
    )
}

export default LoginPage
