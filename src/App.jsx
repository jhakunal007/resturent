import { useState, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, ContactShadows } from '@react-three/drei';
import RestaurantEnvironment from './components/RestaurantEnvironment';
import MenuOverlay from './components/MenuOverlay';

function App() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <div className="canvas-container">
        <Canvas shadows camera={{ position: [0, 5, 10], fov: 50 }}>
          <color attach="background" args={['#f7f9fa']} />
          <ambientLight intensity={0.5} />
          <directionalLight 
            castShadow 
            position={[5, 10, 5]} 
            intensity={1.5} 
            shadow-mapSize={[1024, 1024]}
          />
          <pointLight position={[-5, 5, -5]} intensity={0.5} color="#e67e22" />
          
          <Suspense fallback={null}>
            <RestaurantEnvironment onMenuClick={() => setMenuOpen(true)} />

            <ContactShadows position={[0, 0, 0]} opacity={0.4} scale={50} blur={2} far={10} />
          </Suspense>

          <OrbitControls 
            makeDefault 
            minPolarAngle={Math.PI / 4} 
            maxPolarAngle={Math.PI / 2 - 0.1}
            minDistance={5}
            maxDistance={20}
          />
        </Canvas>
      </div>

      <div className={`ui-container ${menuOpen ? 'menu-active' : ''}`}>
        {!menuOpen && (
          <>
            <div className="title-container">
              <h1>L'Élégance</h1>
              <p>Fine Dining Experience</p>
            </div>
            <button className="explore-button" onClick={() => setMenuOpen(true)}>
              View Menu
            </button>
          </>
        )}
        
        {menuOpen && <MenuOverlay onClose={() => setMenuOpen(false)} />}
      </div>
    </>
  );
}

export default App;
