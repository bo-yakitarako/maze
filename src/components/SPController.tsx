import React from 'react';
import styled from 'styled-components';
import { useController } from '../hooks/useController';
import { Direction } from '../module/appModule';
import { media } from '../module/styleUtility';

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
        <div onPointerDown={go('up')} onPointerLeave={stop} onPointerUp={stop}>
          <ArrowUp />
        </div>
      </ArrowVerticalLayout>
      <ArrowHorizontalLayout>
        <div
          onPointerDown={go('left')}
          onPointerLeave={stop}
          onPointerUp={stop}
        >
          <ArrowLeft />
        </div>
        <div
          onPointerDown={go('down')}
          onPointerLeave={stop}
          onPointerUp={stop}
        >
          <ArrowDown />
        </div>
        <div
          onPointerDown={go('right')}
          onPointerLeave={stop}
          onPointerUp={stop}
        >
          <ArrowRight />
        </div>
      </ArrowHorizontalLayout>
    </Wrapper>
  );
};

export { SPController };

const Wrapper = styled.div`
  width: 100%;
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

const ArrowUp = styled.div`
  width: 70px;
  height: 90px;
  background-color: ${ARROW_COLOR};
  clip-path: polygon(
    100% 50%,
    70% 40%,
    70% 100%,
    30% 100%,
    30% 40%,
    0 50%,
    50% 0
  );
  ${media.lessThan('tiny')`
    width: 55px;
    height: 70px;
  `}
`;

const ArrowDown = styled(ArrowUp)`
  transform: rotate(180deg);
`;

const ArrowHorizontalLayout = styled.div`
  display: flex;
  width: 270px;
  height: 90px;
  justify-content: space-between;
  margin: 10px auto 0 auto;
  ${media.lessThan('tiny')`
    width: 200px;
    height: 70px;
  `}
`;

const ArrowLeft = styled(ArrowUp)`
  transform: rotate(-90deg);
`;

const ArrowRight = styled(ArrowUp)`
  transform: rotate(90deg);
`;
