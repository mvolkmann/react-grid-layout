import React, {ReactElement} from 'react';

type Props = {
  name: string;

  children: ReactElement | string;
};

function Slot({children}: Props): ReactElement {
  return <div>{children}</div>;
}

export default Slot;
