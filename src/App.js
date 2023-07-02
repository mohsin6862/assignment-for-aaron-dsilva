import React from 'react';
import { useFormik } from 'formik';
import {
  TextField,
  TextareaAutosize,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  RadioGroup,
  FormControlLabel,
  Radio,
  Checkbox,
  Button,
  Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(2),
    maxWidth: '400px',
    margin: '0 auto',
    backgroundColor: '#f5f5f5',
    padding: theme.spacing(3),
    borderRadius: '8px',
    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
    marginTop: theme.spacing(4),
  },
  heading: {
    textAlign: 'center',
    marginBottom: theme.spacing(2),
  },
  submitButton: {
    marginTop: theme.spacing(2),
    backgroundColor: '#f50057',
    color: '#fff',
    '&:hover': {
      backgroundColor: '#d5004e',
    },
  },
}));

const countries = [
  { value: 'us', label: 'United States' },
  { value: 'ca', label: 'Canada' },
  { value: 'uk', label: 'United Kingdom' },
  { value: 'au', label: 'Australia' },
];

const hobbies = [
  { value: 'reading', label: 'Reading' },
  { value: 'sports', label: 'Sports' },
  { value: 'music', label: 'Music' },
  { value: 'art', label: 'Art' },
];

const validate = (values) => {
  const errors = {};

  if (!values.name) {
    errors.name = 'Required';
  }

  if (!values.address) {
    errors.address = 'Required';
  }

  if (!values.country) {
    errors.country = 'Required';
  }

  if (!values.gender) {
    errors.gender = 'Required';
  }

  if (!values.hobbies || values.hobbies.length === 0) {
    errors.hobbies = 'Required';
  }

  return errors;
};

const Form = () => {
  const classes = useStyles();
  const formik = useFormik({
    initialValues: {
      name: '',
      address: '',
      country: '',
      gender: '',
      hobbies: [],
    },
    validate,
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  return (
    <form className={classes.form} onSubmit={formik.handleSubmit}>
      <Typography variant="h4" className={classes.heading}>
        Aaron Dsilva Assignment
      </Typography>

      <TextField
        id="name"
        name="name"
        label="Name"
        value={formik.values.name}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.name && Boolean(formik.errors.name)}
        helperText={formik.touched.name && formik.errors.name}
        fullWidth
      />

      <TextareaAutosize
        id="address"
        name="address"
        placeholder="Address"
        value={formik.values.address}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        rows={4}
        error={formik.touched.address && Boolean(formik.errors.address)}
        helperText={formik.touched.address && formik.errors.address}
        fullWidth
      />

      <FormControl
        fullWidth
        error={formik.touched.country && Boolean(formik.errors.country)}
      >
        <InputLabel id="country-label">Country</InputLabel>
        <Select
          id="country"
          name="country"
          labelId="country-label"
          value={formik.values.country}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        >
          {countries.map((country) => (
            <MenuItem key={country.value} value={country.value}>
              {country.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl
        component="fieldset"
        fullWidth
        error={formik.touched.gender && Boolean(formik.errors.gender)}
      >
        <RadioGroup
          id="gender"
          name="gender"
          value={formik.values.gender}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        >
          <FormControlLabel value="male" control={<Radio />} label="Male" />
          <FormControlLabel value="female" control={<Radio />} label="Female" />
          <FormControlLabel value="other" control={<Radio />} label="Other" />
        </RadioGroup>
      </FormControl>

      <FormControl
        fullWidth
        error={formik.touched.hobbies && Boolean(formik.errors.hobbies)}
      >
        <InputLabel id="hobbies-label">Hobbies/Interests</InputLabel>
        <Select
          id="hobbies"
          name="hobbies"
          labelId="hobbies-label"
          multiple
          value={formik.values.hobbies}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          renderValue={(selected) => selected.join(', ')}
        >
          {hobbies.map((hobby) => (
            <MenuItem key={hobby.value} value={hobby.value}>
              <Checkbox checked={formik.values.hobbies.includes(hobby.value)} />
              {hobby.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <Button
        className={classes.submitButton}
        type="submit"
        variant="contained"
      >
        Submit
      </Button>
    </form>
  );
};

export default Form;
