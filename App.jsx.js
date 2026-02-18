import React, { useState, useEffect } from 'react';

// Not: Mind-AR ve A-Frame scriptleri projenin index.html dosyasında 
// veya Vercel'deki head kısmında yüklü olmalıdır.

const WebARScene = () => {
  const [targetFound, setTargetFound] = useState(false);

  return (
    <div style={{ margin: 0, overflow: 'hidden' }}>
      {/* THY Kurumsal Header */}
      <div style={{
        position: 'fixed', top: 0, width: '100%', height: '60px',
        backgroundColor: 'white', display: 'flex', alignItems: 'center',
        justifyContent: 'center', zIndex: 10, borderBottom: '3px solid #CC0000'
      }}>
        <img src="/logo.png" alt="THY" style={{ height: '40px' }} />
      </div>

      <a-scene 
        mindar-image="imageTargetSrc: /targets.mind; autoStart: true; uiLoading: no; uiScanning: yes;" 
        embedded color-space="sRGB" 
        renderer="colorManagement: true, physicallyCorrectLights" 
        vr-mode-ui="enabled: false" 
        device-orientation-permission-ui="enabled: false">
        
        <a-assets>
          <video 
            id="giza-video" 
            src="/giza.mp4" 
            preload="auto" 
            loop 
            playsinline 
            webkit-playsinline 
            muted
          ></video>
        </a-assets>

        <a-camera position="0 0 0" look-controls="enabled: false"></a-camera>

        {/* Giza Piramitleri Target */}
        <a-entity 
          mindar-image-target="targetIndex: 0"
          onTargetFound={() => {
            setTargetFound(true);
            document.querySelector('#giza-video').play();
          }}
          onTargetLost={() => setTargetFound(false)}
        >
          <a-video 
            src="#giza-video" 
            width="1" 
            height="0.56" 
            position="0 0 0"
          ></a-video>
        </a-entity>
      </a-scene>

      {/* FLY TO CAIRO Butonu */}
      {targetFound && (
        <a 
          href="https://www.turkishairlines.com/en-int/flights/flights-to-cairo/" 
          target="_blank" 
          rel="noopener noreferrer"
          style={{
            position: 'fixed', bottom: '80px', left: '50%',
            transform: 'translateX(-50%)',
            padding: '14px 30px',
            backgroundColor: '#CC0000',
            color: 'white',
            borderRadius: '30px',
            fontWeight: 'bold',
            textDecoration: 'none',
            fontSize: '16px',
            boxShadow: '0 10px 25px rgba(0,0,0,0.3)',
            zIndex: 100,
            border: '2px solid white',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            animation: 'fadeInUp 0.5s ease-out'
          }}
        >
          <span>FLY TO CAIRO</span>
          <span style={{ fontSize: '18px' }}>✈️</span>
        </a>
      )}

      {/* Buton Animasyonu İçin CSS */}
      <style>
        {`
          @keyframes fadeInUp {
            from { opacity: 0; transform: translate(-50%, 20px); }
            to { opacity: 1; transform: translate(-50%, 0); }
          }
        `}
      </style>
    </div>
  );
};

export default WebARScene;