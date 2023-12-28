import * as React from 'react';
import {
  Button,
  Container,
  Typography,
  CssBaseline,
  TextField,
  Box,
} from '@mui/material';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { postUserThunk } from 'services/fetchAuth';
import { boxFormStyle } from './StylePages';

export default function SignUp() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();

  const onChangeInput = event => {
    const { name, value } = event.currentTarget;

    switch (name) {
      case 'name':
        setName(value);
        break;
      case 'email':
        setEmail(value);
        break;
      case 'password':
        setPassword(value);
        break;

      default:
        break;
    }
  };

  const onSubmitUser = event => {
    event.preventDefault();
    const newUser = { name, email, password };
    dispatch(postUserThunk(newUser));
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box sx={boxFormStyle}>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <Box component="form" onSubmit={onSubmitUser} sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            inputProps={{
              inputMode: 'text',
            }}
            autoComplete="name"
            name="name"
            value={name}
            required
            fullWidth
            label="Name"
            onChange={onChangeInput}
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            type="email"
            name="email"
            value={email}
            autoComplete="email"
            onChange={onChangeInput}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            type="password"
            name="password"
            value={password}
            label="Password"
            id="password"
            autoComplete="new-password"
            onChange={onChangeInput}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign Up
          </Button>
        </Box>
      </Box>
    </Container>
  );
}
