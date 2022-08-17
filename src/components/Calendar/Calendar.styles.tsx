import styled from 'styled-components';

export const CalendarContainer = styled.ul`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  list-style: none;
  padding: 0;
  margin: 2rem 0;
`;

export const CalendarDayItem = styled.li`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;

  ${({ hasEvent }) =>
    hasEvent
      ? `
      &::before {
        content: '';
        display: block;
        position: absolute;
        top: 0;
        right: 0;
        width: 0.5rem;
        height: 0.5rem;
        border-radius: 50%;
        background: #25AFFA;
        margin: 0.675rem
      }
    `
      : ''}
`;

export const CalendarDayItemButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  width: 3.5rem;
  height: 3.5rem;
  color: #333333;
  border-radius: 50%;
  border: none;
  background-color: rgba(51, 51, 51, 0);
  transition: background-color 0.25s ease;

  &:hover {
    background-color: rgba(51, 51, 51, 0.1);
    cursor: pointer;
  }

  ${({ isCurrentDay }) =>
    isCurrentDay
      ? `
      background-color: #FB3F4A;
      color: #fff;
      transition: none;

      &:hover {
        background-color: #c8323b;
      }
    `
      : ``}

  &:disabled {
    pointer-events: none;
    color: #c4c4c4;
  }
`;
