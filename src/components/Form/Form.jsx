import * as React from 'react';
import { useState, useEffect } from 'react';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectIsContactAdd,
  selectPhoneBookValue,
} from '../../redux/phoneBook/phoneSelector';
import { postContactThunk } from 'services/fetchContacts';
import { Avatar, Button, TextField, Box, Typography } from '@mui/material';
import ContactsIcon from '@mui/icons-material/Contacts';
import { LoadAdd } from 'components/Loader/Loader';
import { avatarStyle } from 'pages/StylePages';

export const options = {
  width: '400px',
  position: 'center-center',
  timeout: 1500,
  fontSize: '20px',
};

export const Form = () => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const [add, setAdd] = useState(false);

  const dispatch = useDispatch();
  const phoneBook = useSelector(selectPhoneBookValue);
  const isContactAdd = useSelector(selectIsContactAdd);

  useEffect(() => {
    setAdd(false);
  }, [phoneBook]);

  useEffect(() => {
    if (isContactAdd) {
      reset();
    }
  }, [isContactAdd]);

  const onSubmitAddContact = event => {
    event.preventDefault();
    const newObj = { name, number };

    if (isNameNew(phoneBook, newObj) !== undefined) {
      Notify.warning(`${newObj.name} is already in contacts`, options);
      return;
    }
    setAdd(true);
    dispatch(postContactThunk(newObj));
  };

  const isNameNew = (phoneBook, newObj) => {
    return phoneBook.find(
      ({ name }) => name.toLowerCase() === newObj.name.toLowerCase()
    );
  };

  const onChangeInput = event => {
    const { name, value } = event.currentTarget;
    switch (name) {
      case 'name':
        setName(value);
        break;
      case 'number':
        setNumber(value);
        break;

      default:
        break;
    }
  };

  const reset = () => {
    setName('');
    setNumber('');
  };

  return (
    <>
      <Avatar sx={avatarStyle}>
        <ContactsIcon />
      </Avatar>
      <Typography color="white" component="h1" variant="h5">
        Add Contact
      </Typography>
      <Box component="form" onSubmit={onSubmitAddContact} sx={{ mt: 1 }}>
        <TextField
          sx={{ backgroundColor: 'rgba(208, 224, 241, 0.822)' }}
          inputProps={{
            inputMode: 'text',
          }}
          margin="normal"
          fullWidth
          label="Name"
          type="text"
          name="name"
          value={name}
          required
          onChange={onChangeInput}
        />
        <TextField
          sx={{ backgroundColor: 'rgba(208, 224, 241, 0.822)' }}
          inputProps={{ inputMode: 'tel', pattern: '[0-9]*' }}
          margin="normal"
          fullWidth
          label="Phone number"
          type="tel"
          name="number"
          value={number}
          required
          onChange={onChangeInput}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{
            mt: 3,
            mb: 2,
            display: 'flex',
            gap: 3,
          }}
        >
          {add && <LoadAdd />}
          <p>Add contact</p>
        </Button>
      </Box>
    </>
  );
};
