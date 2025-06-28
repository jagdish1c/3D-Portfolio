import React from 'react';
import ReactNipple from 'react-nipple';

const Joystick = ({ onMove, onEnd }) => {
  return (
    <div style={{
      position: 'absolute',
      bottom: '20px',
      left: '20px',
      width: '120px',
      height: '120px'
    }}>
      <ReactNipple
        options={{
          mode: 'static',
          position: { top: '50%', left: '50%' },
          color: 'blue',
          size: 120
        }}
        style={{
          width: '120px',
          height: '120px'
        }}
        onMove={(evt, data) => onMove && onMove(data)}
        onEnd={() => onEnd && onEnd()}
      />
    </div>
  );
};

export default Joystick;