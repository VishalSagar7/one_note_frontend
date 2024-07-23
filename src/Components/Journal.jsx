import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import CreateIcon from '@mui/icons-material/Create';
import Button from '@mui/material/Button';
import { BASE_URL } from '../helper';

const Journal = () => {
  const [stories, setStories] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const userInfo = useSelector(store => store.user.userData);
  const { email } = userInfo;

  useEffect(() => {
    const fetchData = async () => {
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
      }
    };

    fetchData();
  }, [email]);

  const filteredStories = stories.filter(story =>
    story.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    story.date.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className='h-auto w-[95%] lg:w-[70%] bg-transparent rounded mx-auto mt-[30px] p-[25px] pb-[50px]'>

      <div className='flex justify-between'>

        <input
          type="text"
          placeholder='Search by title or date'
          className='h-[50px] w-[70%] lg:w-[950px] rounded outline-none border-none text-lg placeholder:pl-[10px] pl-[10px]'
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
        />


        <button 
            onClick={() => navigate('/newdiarypage')}
            className='bg-sky-600 text-lg px-[10px] py-[2px] lg:text-xl lg:px-[20px] flex items-center text-white rounded hover:bg-sky-700'
            >
          create 
          <CreateIcon sx={{
            fontSize : '20px',
            marginLeft : '10px'
          }}/>
        </button>

      </div>

      <div className='w-full p-[12px] h-auto mt-[40px] flex flex-col gap-[10px]' style={{background : 'rgba(0,0,0,0.4)'}}>


        {filteredStories.length === 0 ? (

          <div className='bg-white py-[15px] rounded'>
            <p className='text-center text-xl text-gray-700 font-cursive font-medium'>You don't have any notes currently😒</p>
          </div>

        ) : (
          filteredStories.map((story, idx) => (

            <Link to={`/individualstory/${story.id}`} key={idx}>

              <div className='h-[60px] w-full bg-white p-[10px] rounded cursor-pointer shadow font-roboto pl-[20px] hover:bg-gray-100 flex items-center'>
                <h1 className='text-sky-700 text-md font-semibold'>{story.date}</h1>
                <h1 className='text-xl font-roboto font-medium text-gray-700 ml-[20px]'>{story.title}</h1>
              </div>

            </Link>

          ))

        )}

      </div>
    </div>
  );
};

export default Journal;
