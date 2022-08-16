import { useEffect } from 'react';
import type { MouseEventHandler } from 'react';
import styled from 'styled-components';

import EventForm from '@forms/EventForm';

const ModalOuter = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 10;
  display: flex;
  justify-content: center;
  align-items: center;
  align-content: center;
  background: rgba(0, 0, 0, 0.25);
  backdrop-filter: blur(5px);
`;

const ModalContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 70%;
  height: auto;
  padding: 2rem;
  border-radius: 4px;
  overflow: hidden;
  z-index: 20;
  background: #fff;
`;

const ModalHeading = styled.h2`
  display: flex;
  font-size: 1.5rem;
  text-align: center;
  margin: 1rem 0 2rem;
`;

interface EventModalProps {
  closeEventModal: Function,
}

const EventModal = ({
  closeEventModal,
}: EventModalProps) => {
  const onOutsideClick = (event) => {
    if (event.target !== event.currentTarget) {
      return;
    }

    closeEventModal();
  };

  const handleEscapeKeyPress = (event) => {
    if (event.key === 'Escape' || event.code === 'Escape') {

      closeEventModal();
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleEscapeKeyPress);

    return () => {
      window.removeEventListener('keydown', handleEscapeKeyPress);
    }
  }, []);

  return (
    <ModalOuter onClick={onOutsideClick}>
      <ModalContainer>
        <ModalHeading>Add new event</ModalHeading>

        <EventForm closeEventModal={closeEventModal} />
      </ModalContainer>
    </ModalOuter>
  );
}

export default EventModal;
