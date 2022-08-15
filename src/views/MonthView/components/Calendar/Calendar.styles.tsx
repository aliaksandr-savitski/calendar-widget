import styled from 'styled-components';

export const CalendarContainer = styled.ul`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  list-style: none;
  padding: 0;
  margin: 2rem 0;
`;

export const CalendarDayItem = styled.li`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.5rem;
  height: 3.5rem;
  color: #333333;
  border-radius: 50%;
  background-color: rgba(51, 51, 51, 0);
  transition: background-color 0.25s ease;

  &:hover {
    background-color: rgba(51, 51, 51, 0.1);
    cursor: pointer;
  }

  ${({ isCurrentDay }) => isCurrentDay
    ? `
      background-color: #FB3F4A;
      color: #fff;
      transition: none;

      &:hover {
        background-color: #c8323b;
      }
    `
    : ``
  }
`;
