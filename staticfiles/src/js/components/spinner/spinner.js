import React from 'react';
import RefreshIndicator from 'material-ui/RefreshIndicator';

const defaultStyle = {
  container: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '20px',
  },
  refresh: {
    display: 'inline-block',
    position: 'relative',
  },
};

const Spinner = (size, style) => (
  <div style={style || defaultStyle.container}>
    <RefreshIndicator
      size={size}
      left={10}
      top={0}
      status="loading"
      style={defaultStyle.refresh}
    />
  </div>
);

export default Spinner;
