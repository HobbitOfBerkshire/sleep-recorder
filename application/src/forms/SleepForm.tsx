import React, { useState } from 'react';
import {
  validateDate,
  validateDuration,
  validateGender,
  validateName,
} from '../validators/validators';

interface Props {
  onSubmit: (formData: {
    name: string;
    gender: string;
    duration: number;
    date: string;
  }) => void;
}

const SleepForm: React.FC<Props> = ({ onSubmit }) => {
  const [name, setName] = useState('');
  const [gender, setGender] = useState('');
  const [duration, setDuration] = useState('');
  const [date, setDate] = useState('');
  const [errorMessages, setErrorMessages] = useState({
    name: '',
    gender: '',
    duration: '',
    date: '',
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setErrorMessages({
      name: '',
      gender: '',
      duration: '',
      date: '',
    });

    let isValid = true;

    const nameError = validateName(name);
    if (nameError) {
      setErrorMessages((prev) => ({ ...prev, name: nameError }));
      isValid = false;
    }

    const genderError = validateGender(gender);
    if (genderError) {
      setErrorMessages((prev) => ({ ...prev, gender: genderError }));
      isValid = false;
    }

    const durationNum = parseFloat(duration);
    const durationError = validateDuration(durationNum);
    if (durationError) {
      setErrorMessages((prev) => ({ ...prev, duration: durationError }));
      isValid = false;
    }

    const dateError = validateDate(date);
    if (dateError) {
      setErrorMessages((prev) => ({ ...prev, date: dateError }));
      isValid = false;
    }

    if (isValid) {
      onSubmit({ name, gender, duration: parseFloat(duration), date });
    }
  };

  return (
    <form role="form" onSubmit={handleSubmit} className="my-4" noValidate>
      <div className="mb-3">
        <label htmlFor="name" className="form-label">
          Name:
          <input
            type="text"
            id="name"
            className={`form-control ${errorMessages.name ? 'is-invalid' : ''}`}
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          {errorMessages.name && (
            <div className="invalid-feedback">{errorMessages.name}</div>
          )}
        </label>
      </div>
      <div className="mb-3">
        <label htmlFor="gender" className="form-label">
          Gender:
          <select
            id="gender"
            className={`form-select ${errorMessages.gender ? 'is-invalid' : ''}`}
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            required
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
          {errorMessages.gender && (
            <div className="invalid-feedback">{errorMessages.gender}</div>
          )}
        </label>
      </div>
      <div className="mb-3">
        <label htmlFor="duration" className="form-label">
          Duration (hours):
          <input
            type="number"
            id="duration"
            className={`form-control ${errorMessages.duration ? 'is-invalid' : ''}`}
            step="0.1"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            required
          />
          {errorMessages.duration && (
            <div className="invalid-feedback">{errorMessages.duration}</div>
          )}
        </label>
      </div>
      <div className="mb-3">
        <label htmlFor="date" className="form-label">
          Date:
          <input
            type="date"
            id="date"
            className={`form-control ${errorMessages.date ? 'is-invalid' : ''}`}
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
          {errorMessages.date && (
            <div className="invalid-feedback">{errorMessages.date}</div>
          )}
        </label>
      </div>
      <button type="submit" className="btn btn-primary">
        Submit
      </button>
    </form>
  );
};

export default SleepForm;
