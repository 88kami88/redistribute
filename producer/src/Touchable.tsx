import React, { FunctionComponent } from 'react';

import Button from './styled/Button';
import Label from './styled/Label';
import Ripple from './styled/Ripple';

const Touchable: FunctionComponent<{ onClick(): void }> = ({ children, onClick }) => (
  <Button type="button" onClick={onClick}>
    <Label>{children}</Label>
    <Ripple />
  </Button>
);

export default Touchable;

/* externalize:Touchable */
