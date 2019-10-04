import React, { FunctionComponent } from 'react';
import PropTypes, { InferProps } from 'prop-types';

interface Props {
  onClick(): void;
}

export const Button: FunctionComponent<Props> = ({ onClick }: InferProps<typeof Button.propTypes>) => (
  <button type="button" onClick={onClick}>
    click me
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
