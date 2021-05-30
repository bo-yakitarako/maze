import React from 'react';
import styled, { css } from 'styled-components';
import media from 'styled-media-query';
import { useController } from '../hooks/useController';
import { Direction } from '../module/appModule';

const SPController: React.FC = () => {
  const { go: goRaw, stop } = useController();
  const go =
    (direction: Direction) => (event: React.PointerEvent<HTMLDivElement>) => {
      event.preventDefault();
      goRaw(direction);
    };
  return (
    <Wrapper>
      <ArrowVerticalLayout>
        <ArrowUp
          onPointerDown={go('up')}
          onPointerLeave={stop}
          onPointerUp={stop}
        />
      </ArrowVerticalLayout>
      <ArrowHorizontalLayout>
        <ArrowLeft
          onPointerDown={go('left')}
          onPointerLeave={stop}
          onPointerUp={stop}
        />
        <ArrowRight
          onPointerDown={go('right')}
          onPointerLeave={stop}
          onPointerUp={stop}
        />
      </ArrowHorizontalLayout>
      <ArrowVerticalLayout>
        <ArrowDown
          onPointerDown={go('down')}
          onPointerLeave={stop}
          onPointerUp={stop}
        />
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
