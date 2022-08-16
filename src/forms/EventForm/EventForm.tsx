import { useContext, useEffect } from 'react';
import styled from 'styled-components';
import { useForm } from "react-hook-form";

import { CalendarContext } from '@state/CalendarContext';
import { useAddEventMutation, useUpdateEventMutation } from '@hooks/useEvents';

const Form = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  height: auto;
  flex: 1;
`;

const FieldGroup = styled.div`
  position: relative;
  display: flex;
  width: 100%;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  margin: 1rem 0 2rem;
  color: #4D4D4D;
`;

const ErrorMessage = styled.span`
  display: flex;
  position: absolute;
  top: 110%;
  color: #FB3F4A;
  font-size: 1rem;
`;

const FieldLabel = styled.label`
  font-size: 1.25rem;
  margin-bottom: 0.25rem;
`;

const Input = styled.input`
  width: 100%;
  height: auto;
  font-size: 1.25rem;
  padding: 0.75rem 1rem;
  outline-offset: 2px;
  border-radius: 4px;
  border: 1px solid #D9D9D9;
  outline-color: #1A94DA;
  color: #333;

  &:focus {
    border-color: transparent;
  }

  ${({ hasError }) => hasError
    ? 'border-color: #FB3F4A;'
    : ''
  }

  &:disabled {
    color: #8C8C8C;
  }
`;

const SubmitButton = styled.button`
  display: flex;
  margin-top: 1rem;
  justify-content: center;
  align-items: center;
  border: 1px solid rgba(51, 51, 51, 0.5);
  border-radius: 4px;
  background: #1A94DA;
  border: 1px solid #057DC2;
  padding: 0.5rem 2rem;
  color: #fff;
  transition: all 0.2s linear;

  &:disabled {
    background: #ccc;
    border-color: #8C8C8C;
    cursor: not-allowed;
  }
`;

const CancelButton = styled.button`
  border: none;
  color: #4D4D4D;
  text-decoration: none;
  background: none;
  margin: 1rem 0;

  &:hover {
    text-decoration: underline;
  }
`;

const Spinner = styled.span`
  display: block;
  width: 1.5rem;
  height: 1.5rem;
  border: 1px solid rgba(255, 255, 255, 0.5);
  border-radius: 50%;
  border-top-color: #fff;
  margin-left: 1rem;
  animation: spinner 0.6s linear infinite;
`;

interface EventForm {
  setEvent: Function;
}

const SubmitButtonText = ({ isUpdateMode }) => (
  <span>
    {isUpdateMode
      ? 'Update'
      : 'Submit'
    }
  </span>
);

const EventForm = ({
  closeEventModal,
  existingEvent,
  isUpdateMode,
}) => {
  const { clickedDay, updateEvent, addEvent } = useContext(CalendarContext);
  const { mutate: mutateAddEvent, isAddEventLoading } = useAddEventMutation();
  const { mutate: mutatePatchEvent, isPatchEventLoading } = useUpdateEventMutation();
  
  const { register, handleSubmit, watch, formState: { errors } } = useForm({
    mode: 'onSubmit',
    defaultValues: {
      title: existingEvent?.title ?? '',
    }
  });
  const titleField = watch('title');

  const handleAddEvent = (title: string) => {
    const event = {
      date: clickedDay,
      title,
    };

    mutateAddEvent(event, {
      onSuccess: (data) => {
        addEvent(data);
        closeEventModal();
      }
    });
  }

  const handlePatchEvent = (title) => {
    mutatePatchEvent({ title, id: existingEvent.id }, {
      onSuccess: (data) => {
        updateEvent(data.id, data);
        closeEventModal();
      }
    });
  }

  const onSubmit = ({ title }) => {
    if (!isUpdateMode) {
      handleAddEvent(title);
      return;
    }

    handlePatchEvent(title);
  }

  const isLoading = isAddEventLoading || isPatchEventLoading;

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FieldGroup>
        <FieldLabel htmlFor="date">Date:</FieldLabel>
        <Input
          id="date"
          value={clickedDay}
          disabled
        />
      </FieldGroup>

      <FieldGroup>
        <FieldLabel htmlFor="title">Title:</FieldLabel>
        <Input
          {...register('title', { required: true })}
          id="title"
          hasError={errors.title}
        />

        {errors.title && <ErrorMessage>This field is required</ErrorMessage>}
      </FieldGroup>

      <SubmitButton
        type="submit"
        disabled={isLoading || titleField === existingEvent?.title}
      >
        {isLoading
          ? <Spinner />
          : <SubmitButtonText isUpdateMode={!!isUpdateMode} />
        }
      </SubmitButton>

      <CancelButton onClick={closeEventModal}>
        Cancel
      </CancelButton>
    </Form>
  );
}

export default EventForm;
