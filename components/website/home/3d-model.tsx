"use client";

import React from 'react';
import Script from 'next/script';
import { motion } from 'framer-motion';
import Image from 'next/image';

// Fallback component if the 3D model fails to load
const Fallback = () => (
  <div className="flex justify-center items-center h-full">
    <Image 
      src="/images/hero-gloves.png" 
      alt="HandLine Industrial Safety Gloves" 
      width={550} 
      height={400}
      className="object-contain drop-shadow-2xl max-w-full h-auto"
      priority
    />
  </div>
);

const SPRING_CONFIG = { stiffness: 100, damping: 30, mass: 1 };

export const GlovesModel: React.FC = () => {
  const [modelLoaded, setModelLoaded] = React.useState(false);
  const [scriptLoaded, setScriptLoaded] = React.useState(false);
  const [error, setError] = React.useState(false);

  // Script loaded callback
  const handleScriptLoad = () => {
    setScriptLoaded(true);
  };

  // Script error callback
  const handleScriptError = () => {
    setError(true);
  };

  // Only run on client-side
  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      // Check if we have the web component already
      if (customElements.get('model-viewer')) {
        setScriptLoaded(true);
      }
    }
  }, []);

  if (error) {
    return <Fallback />;
  }

  return (
    <>
      {/* Load the model-viewer script */}
      <Script
        src="https://unpkg.com/@google/model-viewer/dist/model-viewer.min.js"
        type="module"
        onLoad={handleScriptLoad}
        onError={handleScriptError}
      />

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={SPRING_CONFIG}
        className="w-full h-[450px] md:h-[550px] lg:h-[600px] overflow-hidden relative"
        style={{ zIndex: 999 }}
      >
        {scriptLoaded ? (
          <div
            className="w-full h-full overflow-hidden absolute top-0 left-0 right-0 bottom-0"
            style={{ zIndex: 999 }}
            dangerouslySetInnerHTML={{
              __html: `
                <model-viewer
                  src="/images/HLPNP-3d.glb.glb"
                  alt="HandLine Industrial Safety Gloves"
                  auto-rotate
                  auto-rotate-delay="0"
                  rotation-per-second="25deg"
                  camera-controls
                  camera-orbit="0deg 65deg 130%"
                  field-of-view="40deg"
                  min-camera-orbit="auto auto 100%"
                  max-camera-orbit="auto auto 150%"
                  shadow-intensity="1"
                  exposure="0.8"
                  loading="eager"
                  reveal="auto"
                  ar-status="not-presenting"
                  disable-tap="true"
                  style="width: 100%; height: 100%; background-color: transparent; --poster-color: transparent; position: absolute; top: -40px; left: 0; right: 0; bottom: 0; z-index: 999; transform: scale(0.75) translateY(0px);"
                ></model-viewer>
              `,
            }}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            {!error && (
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#F28C38]"></div>
            )}
          </div>
        )}
      </motion.div>
    </>
  );
}; 