import React, { FunctionComponent } from 'react';

interface Props {
  onClick(): void;
}

export const Button: FunctionComponent<Props> = ({ onClick }) => <button onClick={onClick} />;
