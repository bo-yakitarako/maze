import React from 'react';
import { useDispatch } from 'react-redux';
import styled, { css } from 'styled-components';
import media from 'styled-media-query';
import { appModule, Direction } from '../module/appModule';

const SPController: React.FC = () => {
  const dispatch = useDispatch();
  const go = (direction: Direction) => () => {
    dispatch(appModule.actions.move(direction));
  };
  return (
    <Wrapper>
      <ArrowVerticalLayout>
        <ArrowUp onClick={go('up')} />
      </ArrowVerticalLayout>
      <ArrowHorizontalLayout>
        <ArrowLeft onClick={go('left')} />
        <ArrowRight onClick={go('right')} />
      </ArrowHorizontalLayout>
      <ArrowVerticalLayout>
        <ArrowDown onClick={go('down')} />
      </ArrowVerticalLayout>
    </Wrapper>
  );
};

export { SPController };

const Wrapper = styled.div`
  width: 250px;
  margin-top: 15px;
  ${media.greaterThan('medium')`
    display: none;
  `}
`;

const ArrowVerticalLayout = styled.div`
  display: flex;
  justify-content: center;
`;

const ARROW_COLOR = '#d2e3f5';

const ArrowBase = css`
  width: 0;
  height: 0;
  border-style: solid;
`;

const ArrowUp = styled.div`
  ${ArrowBase}
  border-width: 0 37.5px 90px 37.5px;
  border-color: transparent transparent ${ARROW_COLOR} transparent;
`;

const ArrowDown = styled.div`
  ${ArrowBase}
  border-width: 90px 37.5px 0 37.5px;
  border-color: ${ARROW_COLOR} transparent transparent transparent;
`;

const ArrowHorizontalLayout = styled.div`
  display: flex;
  width: 100%;
  height: 75px;
  justify-content: space-between;
`;

const ArrowLeft = styled.div`
  ${ArrowBase}
  border-width: 37.5px 90px 37.5px 0;
  border-color: transparent ${ARROW_COLOR} transparent transparent;
`;

const ArrowRight = styled.div`
  ${ArrowBase}
  border-width: 37.5px 0 37.5px 90px;
  border-color: transparent transparent transparent ${ARROW_COLOR};
`;
