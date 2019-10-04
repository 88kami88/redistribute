import React, { FunctionComponent } from 'react';
import PropTypes, { InferProps } from 'prop-types';

interface Props {
  children: JSX.Element;
  onClick(): void;
}

const Button: FunctionComponent<Props> = ({ onClick, children }: InferProps<typeof Button.propTypes>) => (
  <button type="button" onClick={onClick}>
    {children}
  </button>
);

Button.propTypes = {
  onClick: PropTypes.func,
};

Button.defaultProps = {
  onClick: (): void => {},
};

export default Button;

/* externalize:Button */
