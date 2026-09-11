import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { useCursor, Text } from '@react-three/drei';

function Table({ position }) {
  return (
    <group position={position}>
      {/* Table Top */}
      <mesh position={[0, 1, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[1.5, 1.5, 0.1, 32]} />
        <meshStandardMaterial color="#d4a373" roughness={0.7} />
      </mesh>
      {/* Table Leg */}
      <mesh position={[0, 0.5, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.1, 0.2, 1, 16]} />
        <meshStandardMaterial color="#2c3e50" />
      </mesh>
      {/* Chairs */}
      <mesh position={[2, 0.5, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.5, 1, 0.5]} />
        <meshStandardMaterial color="#e67e22" />
      </mesh>
      <mesh position={[-2, 0.5, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.5, 1, 0.5]} />
        <meshStandardMaterial color="#e67e22" />
      </mesh>
    </group>
  );
}

function MenuStand({ position, onClick }) {
  const [hovered, setHovered] = useState(false);
  const meshRef = useRef();
  
  useCursor(hovered);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime) * 0.2;
    }
  });

  return (
    <group position={position} onClick={onClick} onPointerOver={() => setHovered(true)} onPointerOut={() => setHovered(false)}>
      <mesh position={[0, 1.5, 0]} ref={meshRef} castShadow>
        <boxGeometry args={[1, 1.5, 0.1]} />
        <meshStandardMaterial color={hovered ? "#ffebd6" : "#ffffff"} roughness={0.2} metalness={0.1} />
        <Text
          position={[0, 0.5, 0.06]}
          fontSize={0.2}
          color="#2c3e50"
        >
          MENU
        </Text>
        <Text
          position={[0, 0.2, 0.06]}
          fontSize={0.1}
          color="#e67e22"
        >
          Click to View
        </Text>
      </mesh>
      {/* Stand Base */}
      <mesh position={[0, 0.5, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.05, 0.1, 1, 16]} />
        <meshStandardMaterial color="#2c3e50" />
      </mesh>
      <mesh position={[0, 0.05, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.4, 0.4, 0.1, 32]} />
        <meshStandardMaterial color="#2c3e50" />
      </mesh>
    </group>
  );
}

export default function RestaurantEnvironment({ onMenuClick }) {
  return (
    <group>
      {/* Floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
        <planeGeometry args={[50, 50]} />
        <meshStandardMaterial color="#faedcd" roughness={0.8} />
      </mesh>

      {/* Walls */}
      <mesh position={[0, 5, -10]} receiveShadow>
        <boxGeometry args={[50, 10, 0.5]} />
        <meshStandardMaterial color="#fefae0" roughness={1} />
      </mesh>

      {/* Decorative Plants/Spheres */}
      <mesh position={[-6, 1, -8]} castShadow receiveShadow>
        <sphereGeometry args={[1, 32, 32]} />
        <meshStandardMaterial color="#ccd5ae" roughness={0.9} />
      </mesh>
      <mesh position={[8, 1.5, -7]} castShadow receiveShadow>
        <sphereGeometry args={[1.5, 32, 32]} />
        <meshStandardMaterial color="#e9edc9" roughness={0.9} />
      </mesh>

      {/* Tables */}
      <Table position={[-4, 0, -3]} />
      <Table position={[4, 0, -3]} />
      <Table position={[-5, 0, 3]} />
      <Table position={[5, 0, 3]} />

      {/* Central Menu Stand */}
      <MenuStand position={[0, 0, -2]} onClick={onMenuClick} />
    </group>
  );
}
