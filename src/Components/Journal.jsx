import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import CreateIcon from '@mui/icons-material/Create';
import Button from '@mui/material/Button';
import { BASE_URL } from '../helper';
import Tooltip from '@mui/material/Tooltip';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

const Journal = () => {
  const [stories, setStories] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false); // State to manage loading
  const navigate = useNavigate();
  const userInfo = useSelector(store => store.user.userData);
  const { email } = userInfo;

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true); // Show backdrop
      try {
        const response = await fetch(`${BASE_URL}/api/records`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email }),
        });

        if (response.ok) {
          const data = await response.json();
          setStories(data.diaryContent);
        } else {
          console.error('Failed to fetch:', response.statusText);
        }
      } catch (error) {
        console.error('Error during fetch request:', error);
      } finally {
        setLoading(false); // Hide backdrop
      }
    };

    fetchData();
  }, [email]);

  const filteredStories = stories.filter(story =>
    story.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    story.date.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className='h-auto w-full lg:w-[80%] bg-transparent rounded mx-auto mt-[100px] p-[10px] lg:p-[25px] pb-[50px] relative'>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading} 
      >
        <CircularProgress color="inherit" />
      </Backdrop>

      <div className='flex justify-between w-full'>
        <input
          type="text"
          placeholder='Search by title or date'
          className='h-[50px] w-full rounded-md mx-auto outline-none border-none text-lg placeholder:pl-[10px] pl-[10px]'
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
        />

        <Tooltip title='new note'>
          <button
            onClick={() => navigate('/newdiarypage')}
            className='bg-sky-500 h-[50px] w-[50px] shadow-md text-lg px-[10px] fixed right-[25px] bottom-[100px] lg:right-[180px] lg:bottom-[120px] py-[2px] lg:text-xl lg:px-[20px] flex items-center justify-center text-white rounded-full hover:bg-sky-700'
          >
            <CreateIcon sx={{ fontSize: '30px' }} />
          </button>
        </Tooltip>
      </div>

      <div className='w-full h-auto mt-[30px] flex flex-col gap-[10px]'>
        {filteredStories.length === 0 ? (
          <div className='bg-white py-[15px] rounded'>
            <p className='text-center text-xl text-gray-700 font-cursive font-medium'>You don't have any notes currently😒</p>
          </div>
        ) : (
          filteredStories.map((story, idx) => (
            <Link to={`/individualstory/${story.id}`} key={idx}>
              <div className='auto py-[20px] w-full bg-white p-[10px] rounded cursor-pointer shadow font-roboto pl-[20px] hover:bg-gray-100 lg:flex items-center'>
                <h1 className='text-sky-700 text-sm lg:text-md lg:font-semibold'>{story.date}</h1>
                <h1 className='text-lg font-medium lg:text-xl font-roboto lg:font-medium text-gray-700 lg:ml-[20px]'>{story.title}</h1>
              </div>
            </Link>
          ))
        )}
      </div>
    </div>
  );
};

export default Journal;
