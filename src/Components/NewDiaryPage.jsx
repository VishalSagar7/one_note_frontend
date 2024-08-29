import React, { useRef, useEffect } from 'react';
import Navbar from './Navbar';
import { useFormik } from 'formik';
import YupValidation from '../ValidationsSchemas/NewDiaryPageValidation';
import { useSelector } from 'react-redux';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { useNavigate } from 'react-router-dom';
import homebg from "../assets/homebg.jpeg";
import SaveIcon from '@mui/icons-material/Save';
import Tooltip from '@mui/material/Tooltip';
import { BASE_URL } from '../helper';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';  // Make sure to include the CSS

const modules = {
    toolbar: [
        [{ font: [] }],
        [{ header: [1, 2, 3, 4, 5, 6, false] }],
        ["bold", "italic", "underline", "strike"],
        [{ color: [] }, { background: [] }],
        [{ script: "sub" }, { script: "super" }],
        ["blockquote", "code-block"],
        [{ list: "ordered" }, { list: "bullet" }],
        [{ indent: "-1" }, { indent: "+1" }, { align: [] }],
        ["link", "image", "video"],
        ["clean"],
    ]
};

const InitialValues = {
    date: '',
    title: '',
    content: ''
};

const NewDiaryPage = () => {
    const textareaRef = useRef(null);
    const [open, setOpen] = React.useState(false);
    const userInfo = useSelector(store => store.user.userData);
    const { email } = userInfo;
    const navigate = useNavigate();

    const Formik = useFormik({
        initialValues: InitialValues,
        validationSchema: YupValidation,
        onSubmit: async (values) => {
            const formData = { ...values, email };

            try {
                const response = await fetch(`${BASE_URL}/api/diary`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formData),
                });

                const result = await response.json();
                if (response.ok) {
                    setOpen(true);
                    // resetForm();
                } else {
                    console.log('Failed to submit story: ' + result.message);
                }
            } catch (error) {
                console.error('Error during fetch request:', error);
                alert('An error occurred while submitting the story: ' + error.message);
            }
        }
    });

    useEffect(() => {
        if (!userInfo) {
            navigate('/');
        }
    }, [userInfo, navigate]);

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

    const { values, handleChange, handleSubmit, handleBlur, errors, touched, setFieldValue } = Formik;

    return (
        <div className='w-full h-[200vh] bg-gray-300 '>
            <Navbar />

            <Snackbar open={open} autoHideDuration={2000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="success" variant="filled" sx={{ width: '100%', bgcolor: 'blue' }}>
                    Note saved successfully!
                </Alert>
            </Snackbar>

            <form
                onSubmit={handleSubmit}
                className=' w-[93%] lg:w-[70%] h-auto bg-transparent rounded pt-[150px] mx-auto relative font-roboto'
            >
                <Tooltip title='Save'>
                    <button
                        type='submit'
                        className='absolute flex items-center font-cursive font-semibold text-white text-lg bg-sky-500 hover:bg-sky-600 px-[10px] py-[5px] rounded right-[20px]'
                    >
                        <SaveIcon />
                    </button>
                </Tooltip>

                <div>
                    <input
                        type='date'
                        placeholder='Date'
                        className='text-lg text-gray-700 font-medium px-[8px] py-[4px] rounded mt-[10px] cursor-pointer outline-none hover:ring-[1px] hover:ring-sky-400 focus:ring-[1px] focus:ring-sky-600'
                        name='date'
                        value={values.date}
                        onChange={handleChange}
                        onBlur={handleBlur}
                    />
                    {errors.date && touched.date ? <p className="text-sm text-red-500">{errors.date}</p> : null}
                </div>

                <div className='mt-[10px] w-full'>
                    <input
                        type='text'
                        placeholder='Title'
                        className='w-full border pl-[10px] text-lg font-medium mt-[15px] h-[40px] cursor-pointer outline-none hover:ring-[1px] hover:ring-sky-400 focus:ring-[1px] focus:ring-sky-600 rounded'
                        name='title'
                        value={values.title}
                        onChange={handleChange}
                        onBlur={handleBlur}
                    />
                    {errors.title && touched.title ? <p className="text-sm text-red-500">{errors.title}</p> : null}
                </div>

                <div className='mt-[10px] w-full'>
                    {errors.content && touched.content ? <p className="text-sm text-red-500">{errors.content}</p> : null}
                    <ReactQuill
            
                        ref={textareaRef}
                        modules={modules}
                        className='w-full bg-white border h-auto whitespace-pre-wrap overflow-hidden p-[10px] mt-[15px] cursor-pointer outline-none hover:ring-[1px] hover:ring-sky-400 focus:ring-[1px] focus:ring-sky-600 rounded break-words'
                        value={values.content}
                        onChange={(content) => setFieldValue('content', content)}
                        style={{ resize: 'none' }}
                    />
                </div>
            </form>
        </div>
    );
};

export default NewDiaryPage;
