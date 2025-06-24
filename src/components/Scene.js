import React, { useRef, useEffect, Suspense } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { PerspectiveCamera, Environment } from '@react-three/drei'
import * as THREE from 'three'
import { Car } from './Car'
import { CityWorld } from '../CityWorld'
import { getWeather, getTimeOfDay } from '../services/weatherService'

// Camera that follows the car
function CameraController({ carRef }) {
  const cameraRef = useRef()
  useFrame(() => {
    if (carRef.current && cameraRef.current) {
      const carPos = carRef.current.position
      const distance = 7
      const height = 3
      // Get an offset behind the car based on its rotation
      const offsetX = Math.sin(carRef.current.rotation.y) * distance
      const offsetZ = -Math.cos(carRef.current.rotation.y) * distance
      const targetPosition = new THREE.Vector3(
        carPos.x + offsetX,
        carPos.y + height,
        carPos.z + offsetZ
      )
      // Smoothly follow the car
      cameraRef.current.position.lerp(targetPosition, 0.2)
      cameraRef.current.lookAt(carPos.x, carPos.y + 1, carPos.z)
    }
  })
  return <PerspectiveCamera ref={cameraRef} makeDefault fov={75} />
}

// Movement & Rotation logic
function CarController({ carRef, keysPressed }) {
  useFrame(() => {
    if (!carRef.current) return
    const speed = 0.1
    const rotationSpeed = 0.03

    // Rotation left/right
    if (keysPressed.current['a'] || keysPressed.current['arrowleft']) {
      carRef.current.rotation.y += rotationSpeed
    }
    if (keysPressed.current['d'] || keysPressed.current['arrowright']) {
      carRef.current.rotation.y -= rotationSpeed
    }

    // Forward/Backward movement
    if (keysPressed.current['w'] || keysPressed.current['arrowup']) {
      carRef.current.translateZ(speed) // FORWARD
    }
    if (keysPressed.current['s'] || keysPressed.current['arrowdown']) {
      carRef.current.translateZ(-speed) // BACKWARD
    }
  })
  return null
}

// Main Scene
function Scene() {
  const carRef = useRef()
  const keysPressed = useRef({})

  const [weatherCondition, setWeatherCondition] = React.useState('clear')
  const [timeOfDay, setTimeOfDay] = React.useState('afternoon')
  const [weatherInfo, setWeatherInfo] = React.useState({ temperature: 20, city: 'Mumbai' })
  const [selectedCity, setSelectedCity] = React.useState('Mumbai')

  useEffect(() => {
    const fetchWeather = async () => {
      const data = await getWeather(selectedCity)
      setWeatherCondition(data.condition)
      setTimeOfDay(data.timeOfDay)
      setWeatherInfo({ temperature: data.temperature, city: data.city })
    }
    fetchWeather()
    const weatherInterval = setInterval(fetchWeather, 60000) // Update every 1 minute

    return () => {
      clearInterval(weatherInterval)
    }
  }, [selectedCity])

  // Keyboard listener
  useEffect(() => {
    const handleKeyDown = (e) => (keysPressed.current[e.key.toLowerCase()] = true)
    const handleKeyUp = (e) => (keysPressed.current[e.key.toLowerCase()] = false)
    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('keyup', handleKeyUp)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('keyup', handleKeyUp)
    }
  }, [])

  return (
    <div style={{ width: '100%', height: '100vh' }}>
      <Canvas shadows>
        <CityWorld weatherCondition={weatherCondition} timeOfDay={timeOfDay} />
        <ambientLight intensity={0.5} />

        <Suspense fallback={null}>
          <Car ref={carRef} scale={[0.01, 0.01, 0.01]} />
          <Environment preset={timeOfDay === 'night' ? 'night' : timeOfDay === 'evening' ? 'sunset' : 'city'} />
        </Suspense>

        <CameraController carRef={carRef} />
        <CarController carRef={carRef} keysPressed={keysPressed} />
      </Canvas>

      <div
        className="weather-info"
        style={{
          position: 'absolute',
          top: '10px',
          right: '10px',
          background: 'rgba(0,0,0,0.5)',
          color: 'white',
          padding: '10px',
          borderRadius: '5px'
        }}
      >
        <p>{weatherInfo.city}: {weatherInfo.temperature}°C</p>
        <p>Weather: {weatherCondition}</p>
        <p>Time: {timeOfDay}</p>
        <div style={{ marginTop: '10px' }}>
          <select 
            value={selectedCity}
            onChange={(e) => setSelectedCity(e.target.value)}
            style={{
              background: 'rgba(255,255,255,0.8)',
              padding: '5px',
              borderRadius: '3px',
              border: 'none'
            }}
          >
            <option value="Mumbai">Mumbai</option>
            <option value="New York">New York</option>
            <option value="London">London</option>
            <option value="Tokyo">Tokyo</option>
            <option value="Sydney">Sydney</option>
            <option value="Paris">Paris</option>
            <option value="Dubai">Dubai</option>
            <option value="Singapore">Singapore</option>
          </select>
        </div>
      </div>
    </div>
  )
}

export default Scene
