//*- explain what automated testing is and its importance
//* Automated Testing is a technique where tester writes scripts on their own to test how application are usually run by user. 
//*They are important because they make sure our application is free from bugs and it also explains what the expected output should be for our code.
  



import React from 'react';
import { getAllByLabelText, render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';
import ContactForm from './ContactForm';

test('renders without errors', () => {
  render(<ContactForm />);
});

test('renders the contact form header', async() => {
  render(<ContactForm />);

  const header = screen.queryByText(/contact form/i)
  expect(header).toBeInTheDocument();
  expect(header).toBeTruthy();
  expect(header).toHaveTextContent(/contact form/i);
});

test('renders ONE error message if user enters less then 5 characters into firstname.', async () => {
  render(<ContactForm />);

  const firstNameInput = screen.getByLabelText(/first name*/i)
    userEvent.type(firstNameInput, 'Gab');

    const errorMessage = await screen.findAllByTestId('error');
    expect(errorMessage).toHaveLength(1);
});

test('renders THREE error messages if user enters no values into any fields.', async () => {
  render(<ContactForm />);

  const submitButton = screen.getByRole('button');
  userEvent.click(submitButton);

  await waitFor(() => {
    const errorMessages = screen.queryAllByTestId('error');
    expect(errorMessages).toHaveLength(3);
  });   
});

test('renders ONE error message if user enters a valid first name and last name but no email.', async () => {
  render(<ContactForm />);

  const firstNameInput = screen.getByLabelText(/first name*/i)
    userEvent.type(firstNameInput, 'Gabby');

  const lastNameInput = screen.getByLabelText(/last name*/i)
    userEvent.type(lastNameInput, 'Nunez');  
  
  const submitButton = screen.getByRole('button');
  userEvent.click(submitButton);

  const errorMessage = await screen.findAllByTestId('error');
  expect(errorMessage).toHaveLength(1);

});

test('renders "email must be a valid email address" if an invalid email is entered', async () => {
  render(<ContactForm />);

  const emailInput = screen.getByLabelText(/email*/i)
    userEvent.type(emailInput, 'hellllooooo');

  const errorMessage = await screen.findByText(/email must be a valid email address/i);
  expect(errorMessage).toBeInTheDocument();
});

test('renders "lastName is a required field" if an last name is not entered and the submit button is clicked', async () => {
  render(<ContactForm />);

  const firstNameInput = screen.getByLabelText(/first name*/i)
    userEvent.type(firstNameInput, 'Gabby');

  const emailInput = screen.getByLabelText(/email*/i)
    userEvent.type(emailInput, 'gabby@gmail.com');

  const submitButton = screen.getByRole('button');
    userEvent.click(submitButton);

  const errorMessage = await screen.findByText(/lastName is a required field/i);
  expect(errorMessage).toBeInTheDocument();
});

test('renders all firstName, lastName and email text when submitted. Does NOT render message if message is not submitted.', async () => {
  render(<ContactForm />)

  const firstNameInput = screen.getByLabelText(/first name*/i)
    userEvent.type(firstNameInput, 'Gabby');

  const lastNameInput = screen.getByLabelText(/last name*/i)
    userEvent.type(lastNameInput, 'Nunez');  

  const emailInput = screen.getByLabelText(/email*/i)
    userEvent.type(emailInput, 'gabby@gmail.com');  

  const messageInput = screen.getByLabelText(/message/i)
    userEvent.type(messageInput, 'hellllloooooo')  

  const submitButton = screen.getByRole('button');
    userEvent.click(submitButton);  

  await waitFor(() => {
    const firstNameDisplay = screen.queryByText('Gabby');
    const lastNameDisplay = screen.queryByText('Nunez');
    const emailDisplay = screen.queryByText('gabby@gmail.com');
    const messageDisplay = screen.queryByText('hellllloooooo');

    expect(firstNameDisplay).toBeInTheDocument();
    expect(lastNameDisplay).toBeInTheDocument();
    expect(emailDisplay).toBeInTheDocument();
    expect(messageDisplay).toBeInTheDocument();
  })
});

test('renders all fields text when all fields are submitted.', async () => {
  render(<ContactForm />)

  const firstNameInput = screen.getByLabelText(/first name*/i)
    userEvent.type(firstNameInput, 'Gabby');

  const lastNameInput = screen.getByLabelText(/last name*/i)
    userEvent.type(lastNameInput, 'Nunez');  

  const emailInput = screen.getByLabelText(/email*/i)
    userEvent.type(emailInput, 'gabby@gmail.com');  

  const submitButton = screen.getByRole('button');
    userEvent.click(submitButton);  

  await waitFor(() => {
    const firstNameDisplay = screen.queryByText('Gabby');
    const lastNameDisplay = screen.queryByText('Nunez');
    const emailDisplay = screen.queryByText('gabby@gmail.com');
    const messageDisplay = screen.queryByTestId('displayMessage');

    expect(firstNameDisplay).toBeInTheDocument();
    expect(lastNameDisplay).toBeInTheDocument();
    expect(emailDisplay).toBeInTheDocument();
    expect(messageDisplay).not.toBeInTheDocument();
  })
});
