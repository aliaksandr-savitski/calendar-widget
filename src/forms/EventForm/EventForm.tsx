import styled from 'styled-components';
import { useForm } from "react-hook-form";

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
`;

const EventForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const onSubmit = data => console.log(data);

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FieldGroup>
        <Input {...register('eventName', { required: true })} />

        {errors.eventName && <ErrorMessage>This field is required</ErrorMessage>}
      </FieldGroup>

      <SubmitButton type="submit">Submit</SubmitButton>
    </Form>
  );
}

export default EventForm;
