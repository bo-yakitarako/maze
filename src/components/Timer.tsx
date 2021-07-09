import React from 'react';
import styled from 'styled-components';
import { useShallowEqualSelector } from '../hooks/useShallowEqualSelector';
import { media } from '../module/styleUtility';
import { TimeDisplay } from './TimeDisplay';

const Timer: React.FC = () => {
  const { time, best, difference } = useShallowEqualSelector(
    ({ mode, timer, bestTime, mazeSize }) => {
      const best = bestTime[mode][mazeSize];
      return {
        time: timer.time,
        best: best || timer.time,
        difference: best ? timer.time - best : 0,
      };
    },
  );
  return (
    <TimerWrapper>
      <TimeDisplay label="ベスト" time={best} best />
      <TimeDisplay label="タイム" time={time} />
      <TimeDisplay label="ベスト差" time={difference} difference />
    </TimerWrapper>
  );
};

export { Timer };

const TimerWrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 450px;
  ${media.lessThan('medium')`
    width: 80%;
  `}
`;
