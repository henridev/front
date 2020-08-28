import React, { FC, ReactElement, memo } from 'react';
import { usePipeToDateString } from '../../../../services/hooks/usePipeToDateString';

type Props = {
  NC?: Date;
  NP?: Date;
  DEG?: Date;
  MEP?: Date;
};

type ClockProps = { info: { calendar: string; clock: string } };

const PrestationList: FC<Props> = ({ NP, DEG, MEP, NC }): ReactElement => {
  const { pipeToReadableDate } = usePipeToDateString();

  const CalendarClock = ({ info: { calendar, clock } }: ClockProps) => (
    <>
      {calendar}
      <br />
      {clock}
    </>
  );

  return (
    <>
      <p className="pl-0 font-paris">
        <div className="font-grey-darker service-title">NC</div>
        <CalendarClock info={pipeToReadableDate(NC)} />
      </p>
      <p>
        <div className="font-grey-darker service-title">NP</div>
        <CalendarClock info={pipeToReadableDate(NP)} />
      </p>
      <p className="pl-0">
        <div className="font-grey-darker service-title">Dégraffitage</div>

        <CalendarClock info={pipeToReadableDate(DEG)} />
      </p>
      <p>
        <div className="font-grey-darker service-title">MEP</div>
        <CalendarClock info={pipeToReadableDate(MEP)} />
      </p>
    </>
  );
};

export default memo(PrestationList);
