import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useContext } from 'react';
import styled from 'styled-components';

import EventForm from '@/forms/EventForm';
import { CalendarContext } from '@/state/CalendarContext';

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
  border-radius: 4px;
  overflow: hidden;
  z-index: 20;
  background: #fff;
  padding: 1rem;
`;

const ModalHeader = styled.header`
  display: flex;
  width: 100%;
  // border-bottom: 1px solid #D9D9D9;
  padding: 1.25rem 0;
`;

const Divider = styled.hr`
  width: 100%;
  height: 1px;
  background-color: #d9d9d9;
  border: none;
  margin: 1rem 0;
`;

const ModalHeading = styled.h2`
  display: flex;
  font-size: 1.5rem;
  text-align: center;
  font-weight: 400;
`;

interface EventModalProps {
  closeEventModal: Function;
  isOpen: boolean;
}

const EventModal = ({ closeEventModal, isOpen }: EventModalProps) => {
  const { clickedDay, events } = useContext(CalendarContext);
  const existingEvent = events?.find((item) => item.date === clickedDay);

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
    };
  }, []);

  const isUpdate = !!existingEvent;

  return (
    <AnimatePresence>
      {isOpen ? (
        <ModalOuter
          onClick={onOutsideClick}
          as={motion.div}
          key="modal"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <ModalContainer>
            <ModalHeader>
              <ModalHeading>{`${isUpdate ? 'Update' : 'Add new'}`} event</ModalHeading>
            </ModalHeader>

            <Divider />

            <EventForm
              closeEventModal={closeEventModal}
              existingEvent={existingEvent}
              isUpdateMode={isUpdate}
            />
          </ModalContainer>
        </ModalOuter>
      ) : null}
    </AnimatePresence>
  );
};

export default EventModal;
