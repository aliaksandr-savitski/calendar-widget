import { useContext } from 'react';
import styled from 'styled-components';
import { useForm } from "react-hook-form";

import { CalendarContext } from '@state/CalendarContext';
import { useEventsQuery, useAddEventMutation, useUpdateEventMutation } from '@hooks/useEvents';

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
  width: 100%:
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  margin: 1rem 0 2rem;
`;

const ErrorMessage = styled.span`
  display: flex;
  position: absolute;
  top: 110%;
  color: #FB3F4A;
  font-size: 1rem;
`;

const Input = styled.input`
  width: 100%;
  height: auto;
  font-size: 1.25rem;
  padding: 0.75rem 1rem;
  outline-offset: 2px;
  border-radius: 4px;
  border: 1px solid rgba(51, 51, 51, 0.5);
  outline-color: #1A94DA;

  &:focus {
    border-color: transparent;
  }

  ${({ hasError }) => hasError
    ? 'border-color: #FB3F4A;'
    : ''
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

const EventForm = ({ closeEventModal }) => {
  const { clickedDay } = useContext(CalendarContext);
  const { data: events } = useEventsQuery();
  const { mutate: addEvent, isAddEventLoading } = useAddEventMutation();
  const { mutate: patchEvent, isPatchEventLoading } = useUpdateEventMutation();
  const existingEvent = events?.find(item => item.date === clickedDay);
  
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

    addEvent(event, { onSuccess: closeEventModal });
  }

  const handlePatchEvent = (title) => {
    patchEvent({ title, id:existingEvent.id });
  }

  const onSubmit = ({ title }) => {
    if (!existingEvent) {
      handleAddEvent(title);
      return;
    }

    handlePatchEvent(title);
  }

  const isLoading = isAddEventLoading || isPatchEventLoading;

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FieldGroup>
        <Input
          {...register('title', { required: true })}
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
          : <SubmitButtonText isUpdateMode={!!existingEvent} />
        }
      </SubmitButton>
    </Form>
  );
}

export default EventForm;
