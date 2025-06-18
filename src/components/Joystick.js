import React from 'react';
import ReactNipple from 'react-nipple';

const Joystick = ({ onMove, onEnd }) => {
  const handleJoystickMove = (evt, data) => {
    // Only process if we have valid angle data
    if (data && data.angle && data.force) {
      const angle = data.angle.radian;
      const force = Math.min(data.force / 50, 1); // Normalize force for better control
      
      // Calculate x and z movement based on angle and force
      // Flip the coordinates to match the car's movement direction
      const x = Math.sin(angle) * force;
      const z = Math.cos(angle) * force;
      
      onMove({ x, z });
    }
  };

  const handleJoystickEnd = () => {
    onEnd();
  };

  return (
    <div style={{ 
      position: 'fixed', 
      bottom: '40px', 
      left: '50%', 
      transform: 'translateX(-50%)',
      zIndex: 100 
    }}>
      <div style={{
        width: 200,
        height: 200,
        background: 'rgba(0, 0, 0, 0.3)',
        borderRadius: '50%',
        border: '2px solid rgba(255, 255, 255, 0.5)',
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.5)'
      }}>
        <ReactNipple
          options={{ 
            mode: 'static', 
            position: { top: '50%', left: '50%' }, 
            color: 'blue',
            size: 150,
            threshold: 0.1,
            fadeTime: 0
          }}
          style={{
            width: '100%',
            height: '100%',
          }}
          onMove={handleJoystickMove}
          onEnd={handleJoystickEnd}
        />
      </div>
    </div>
  );
};

export default Joystick;