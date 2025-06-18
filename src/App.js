import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import Scene from './components/Scene';
import Joystick from './components/Joystick';
import About from './components/About';

function App() {
  // Position car at the starting line
  const [carPosition, setCarPosition] = useState([0, 0, 25]);
  const [carRotation, setCarRotation] = useState([0, 0, 0]); // Start facing forward (Z-negative)
  const [movement, setMovement] = useState({ x: 0, z: 0 });
  const [isMoving, setIsMoving] = useState(false);
  const [perspective, setPerspective] = useState('third-person');
  const [keyboardControls, setKeyboardControls] = useState({
    forward: false,
    backward: false,
    left: false,
    right: false
  });
  
  // Speed reference for smooth movement
  const speedRef = useRef(0);

  // Handle joystick movement
  const handleJoystickMove = (data) => {
    // Only set movement if there's actual input
    if (Math.abs(data.x) > 0.05 || Math.abs(data.z) > 0.05) {
      setMovement(data);
      setIsMoving(true);
      
      // For joystick, we want to directly control the car's rotation
      // based on the joystick direction - invert Z for correct orientation
      const angle = Math.atan2(data.x, -data.z);
      setCarRotation([0, angle, 0]);
    }
  };

  // Handle joystick release
  const handleJoystickEnd = () => {
    setIsMoving(false);
    setMovement({ x: 0, z: 0 });
    // Reset speed when joystick is released
    speedRef.current = 0;
  };

  // Handle keyboard controls
  useEffect(() => {
    const handleKeyDown = (e) => {
      switch(e.key) {
        case 'ArrowUp':
        case 'w':
          setKeyboardControls(prev => ({ ...prev, forward: true }));
          setIsMoving(true);
          break;
        case 'ArrowDown':
        case 's':
          setKeyboardControls(prev => ({ ...prev, backward: true }));
          setIsMoving(true);
          break;
        case 'ArrowLeft':
        case 'a':
          setKeyboardControls(prev => ({ ...prev, left: true }));
          break;
        case 'ArrowRight':
        case 'd':
          setKeyboardControls(prev => ({ ...prev, right: true }));
          break;
        default:
          break;
      }
    };

    const handleKeyUp = (e) => {
      switch(e.key) {
        case 'ArrowUp':
        case 'w':
          setKeyboardControls(prev => {
            const newControls = { ...prev, forward: false };
            if (!newControls.backward) setIsMoving(false);
            return newControls;
          });
          break;
        case 'ArrowDown':
        case 's':
          setKeyboardControls(prev => {
            const newControls = { ...prev, backward: false };
            if (!newControls.forward) setIsMoving(false);
            return newControls;
          });
          break;
        case 'ArrowLeft':
        case 'a':
          setKeyboardControls(prev => ({ ...prev, left: false }));
          break;
        case 'ArrowRight':
        case 'd':
          setKeyboardControls(prev => ({ ...prev, right: false }));
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  // Update movement based on keyboard controls
  useEffect(() => {
    if (keyboardControls.forward || keyboardControls.backward || keyboardControls.left || keyboardControls.right) {
      const forwardValue = keyboardControls.forward ? 1 : (keyboardControls.backward ? -1 : 0);
      
      // Update car rotation directly when turning
      if (keyboardControls.left) {
        setCarRotation(prev => [prev[0], prev[1] + 0.05, prev[2]]);
      }
      if (keyboardControls.right) {
        setCarRotation(prev => [prev[0], prev[1] - 0.05, prev[2]]);
      }
      
      // Set movement for forward/backward
      if (forwardValue !== 0) {
        setMovement({ x: 0, z: forwardValue });
        setIsMoving(true);
      } else if (!keyboardControls.forward && !keyboardControls.backward && isMoving) {
        // Stop movement if no forward/backward keys are pressed
        setMovement({ x: 0, z: 0 });
        setIsMoving(false);
      }
    }
  }, [keyboardControls, isMoving]);

  // Update car position based on joystick/keyboard input with smooth movement and track boundaries
  useEffect(() => {
    if (!isMoving) return;

    const maxSpeed = 0.3; // Maximum speed
    const acceleration = 0.1; // Increased acceleration for more responsive movement
    const deceleration = 0.05; // How quickly the car slows down
    
    // Track boundaries
    const trackOuterRadius = 30;
    const trackInnerRadius = 20;
    
    const interval = setInterval(() => {
      // Calculate movement force
      const force = Math.sqrt(movement.x * movement.x + movement.z * movement.z);
      
      // Update speed based on movement
      if (force > 0.1) {
        speedRef.current = Math.min(speedRef.current + acceleration, maxSpeed);
      } else {
        speedRef.current = Math.max(speedRef.current - deceleration, 0);
      }
      
      // Calculate new position - negative Z is forward for the car model
      const moveX = Math.sin(carRotation[1]) * speedRef.current;
      const moveZ = -Math.cos(carRotation[1]) * speedRef.current;
      
      const newX = carPosition[0] + moveX;
      const newZ = carPosition[2] + moveZ;
      
      // Check if new position is within track boundaries
      const distanceFromCenter = Math.sqrt(newX * newX + newZ * newZ);
      
      // Only update position if within track boundaries
      if (distanceFromCenter < trackOuterRadius - 1 && distanceFromCenter > trackInnerRadius + 1) {
        setCarPosition([newX, carPosition[1], newZ]);
      } else {
        // Collision with wall - stop movement
        speedRef.current = 0;
      }
      
      // Stop movement if speed is too low
      if (speedRef.current < 0.01) {
        setIsMoving(false);
      }
    }, 16); // ~60fps

    return () => clearInterval(interval);
  }, [movement, isMoving, carRotation, carPosition, keyboardControls]);

  // Toggle between first-person and third-person perspectives
  const togglePerspective = () => {
    setPerspective(prev => prev === 'first-person' ? 'third-person' : 'first-person');
  };

  return (
    <div className="App">
      <Scene carPosition={carPosition} carRotation={carRotation} perspective={perspective} />
      
      {/* <div className="content">
        <header>
          <h1>My Interactive Portfolio</h1>
          <p>Use the joystick to drive the car around the page</p>
        </header>
        
        <About />
      </div> */}
      
      <button 
        onClick={togglePerspective}
        className="perspective-button"
      >
        {perspective === 'first-person' ? 'Switch to Third-Person' : 'Switch to First-Person'}
      </button>
      
      <div className="controls-info">
        <p>Keyboard: WASD or Arrow Keys | Joystick: Tap and drag</p>
      </div>
      
      <Joystick onMove={handleJoystickMove} onEnd={handleJoystickEnd} />
    </div>
  );
}

export default App;