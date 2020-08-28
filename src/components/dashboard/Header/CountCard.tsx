import React, { FC, ReactElement, memo, EventHandler } from 'react';
import Card from 'react-bootstrap/Card';

type Props = {
  title: string;
  color: 'pink' | 'grey' | 'green';
  isActive: boolean;
  count: number;
  handler: EventHandler<any>;
};

const CountCard: FC<Props> = ({ title, color, isActive, count, handler }): ReactElement => {
  return (
    <Card onClick={handler} className="text-center count font-paris font-grey-darker pointer">
      <Card.Body className={`p-0 ${isActive ? `bottom-${color}` : ''}`} data-testid="body">
        <Card.Title as="div" className={`font-${color} title-big`}>
          {count}
        </Card.Title>
        <Card.Text className="mb-2 mb-sm-3">{title}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default memo(CountCard);
