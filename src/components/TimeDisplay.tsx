import React, { useMemo } from 'react';
import styled from 'styled-components';
import { Typography } from '@material-ui/core';
import { media } from '../module/styleUtility';

type Props = {
  time: number;
  label: string;
  best?: boolean;
  difference?: boolean;
};

const TimeDisplay: React.FC<Props> = ({ label, time, best, difference }) => {
  const displayTime = useMemo(() => parseTimeText(Math.abs(time)), [time]);
  const color = useMemo(() => {
    if (difference) {
      return time <= 0 ? 'initial' : 'error';
    }
    return best ? 'primary' : 'initial';
  }, [time, best, difference]);
  const sign = useMemo(() => {
    if (!difference || time === 0) {
      return '';
    }
    return time < 0 ? '-' : '+';
  }, [time, difference]);
  return (
    <Wrapper normal={!best && !difference}>
      <Label>{label}</Label>
      <TimeText
        minus={time < 0 ? 'true' : 'false'}
        color={color}
      >{`${sign}${displayTime}`}</TimeText>
    </Wrapper>
  );
};

export { TimeDisplay };

const parseTimeText = (millisecond: number) => {
  const milliTime = millisecond % 1000;
  const centiTime = Math.floor(milliTime / 10);
  const second = (millisecond - milliTime) / 1000;
  const minute = Math.floor(second / 60);
  if (minute > 99) {
    return '99:59:99';
  }
  const secondTime = second - 60 * minute;
  const plusZero = (num: number) => `00${num}`.slice(-2);
  return `${plusZero(minute)}:${plusZero(secondTime)}:${plusZero(centiTime)}`;
};

const Wrapper = styled.div<{ normal?: boolean }>`
  margin: ${({ normal }) => (normal ? '0 20px' : '0')};
`;

const Label = styled(Typography)`
  color: #757575;
  font-size: 15px;
  transform: translateY(12px);
  ${media.lessThan('medium')`
    font-size: 14px;
    transform: translateY(10px);
  `}
  ${media.lessThan('small')`
    font-size: 12px;
    transform: translateY(9px);
  `}
  ${media.lessThan('tiny')`
    font-size: 10px;
  `}
`;

const TimeText = styled(Typography)<{ minus: 'true' | 'false' }>`
  font-size: 30px;
  ${({ minus }) => minus === 'true' && 'color: #0f9960;'}
  ${media.lessThan('medium')`
    font-size: 26px;
  `}
  ${media.lessThan('small')`
    font-size: 22px;
  `}
  ${media.lessThan('tiny')`
    font-size: 18px;
  `}
`;
