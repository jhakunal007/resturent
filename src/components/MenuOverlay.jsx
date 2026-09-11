import { useState } from 'react';
import { menuData } from '../data/menuData';

export default function MenuOverlay({ onClose }) {
  const [activeCategory, setActiveCategory] = useState(menuData.categories[0]);

  return (
    <div className="menu-overlay">
      <div className="menu-container glass-panel">
        <button className="close-button" onClick={onClose}>×</button>
        <h1 className="menu-title">Our Menu</h1>
        
        <div className="menu-tabs">
          {menuData.categories.map((category) => (
            <button
              key={category}
              className={`menu-tab ${activeCategory === category ? 'active' : ''}`}
              onClick={() => setActiveCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="menu-items-list">
          {menuData.items
            .filter((item) => item.category === activeCategory)
            .map((item) => (
              <div key={item.id} className="menu-item">
                <div className="menu-item-header">
                  <h3>{item.name}</h3>
                  <span className="price">{item.price}</span>
                </div>
                <p className="description">{item.description}</p>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
