import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import homebg from "../assets/homebg.jpeg";
import DeleteIcon from '@mui/icons-material/Delete';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import HomeIcon from '@mui/icons-material/Home';
import Home from '@mui/icons-material/Home';
import { useNavigate } from 'react-router-dom';
import Tooltip from '@mui/material/Tooltip';
import { BASE_URL } from '../helper';


const IndividualStoryComponent = () => {

  const navigate = useNavigate()
  const userInfo = useSelector(store => store.user.userData);
  const { id } = useParams();
  const { email } = userInfo;
  const [contentData, setContentData] = useState({});
  const [dialogOpen, setDialogOpen] = useState(false);
  const [deleteSuccess, setDeleteSuccess] = useState(false);


  useEffect(() => {
    const fetchContentData = async () => {
      try {
        const response = await fetch(`${BASE_URL}/api/records/${id}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email }),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const result = await response.json();
        if (result.diaryEntry) {
          setContentData(result.diaryEntry);
        } else {
          setContentData(null);
        }

      } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
        setContentData(null);
      }
    };

    fetchContentData();
  }, [id, email, deleteSuccess]);

  const handleDeleteClick = () => {
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  const handleConfirmDelete = async () => {
    try {
      const response = await fetch(`${BASE_URL}/api/records/${id}/delete`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const result = await response.json();
      if (result.success) {
        setDeleteSuccess(true);
        setDialogOpen(false);
      }

    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
    }
  };


  return (
    <>

      <Navbar />

      <div className='min-h-[100vh] w-full bg-sky bg-gray-200 pb-[100px] font-roboto pt-[130px]'>



        <div className='bg-white h-auto rounded w-full lg:w-[70%] mx-auto  p-[15px] lg:p-[25px] mb-[100px] '>


          {contentData ? (
            contentData === null ? (
              <p className='text-xl text-gray-700'>This note doesn't exist</p>
            ) : (
              <>
                <div className='border-b border-gray-300  pb-[10px] flex justify-between'>
                  <h1 className='text-2xl font-medium text-gray-800'>{contentData.title}</h1>
                  <Tooltip title="delete">
                    <DeleteIcon
                      sx={{ cursor: 'pointer' }}
                      onClick={handleDeleteClick}
                    />
                  </Tooltip>
                </div>

                <div className='my-[15px] text-right px-[10px] rounded'>
                  <h1 className='lg:text-lg font-medium inline-block text-sky-700 pl-[10px]'>{contentData.date}</h1>
                </div>

                <div className='mt-[10px]'>
                  <div className='text-lg' dangerouslySetInnerHTML={{ __html: contentData.content }} />
                </div>


                <div className='mt-[40px] font-semibold h-[25px] w-full rounded flex justify-end items-center pr-[20px]'>
                  <span className=' text-gray-600 ml-auto text-sm font-cursive'>{userInfo.name}</span>
                </div>

              </>
            )
          ) : (
            <div className='flex items-center'>

              <p className='text-xl text-gray-700'>Note deleted successfully</p>
              <CheckCircleIcon
                sx={{ color: 'skyblue', marginLeft: '10px', fontSize: '30px' }}
              />

              <Tooltip title="Go to home">
                <Home
                  onClick={() => navigate('/home')}
                  sx={{ fontSize: '30px', color: 'gray', marginLeft: 'auto', ":hover": { color: 'black' } }}
                />
              </Tooltip>

            </div>
          )}

          <Dialog
            open={dialogOpen}
            onClose={handleDialogClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">
              {"Confirm Deletion"}
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                Are you sure you want to delete this note?
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleDialogClose}>Cancel</Button>
              <Button onClick={handleConfirmDelete} color="primary" autoFocus>
                Delete
              </Button>
            </DialogActions>
          </Dialog>

        </div>
      </div>
    </>
  );
};

export default IndividualStoryComponent;
