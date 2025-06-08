'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Card } from '@/components/ui/card';
import { MapPin, Phone, Mail, Building2, MapIcon, Shield } from 'lucide-react';
import { motion } from 'framer-motion';
import { useLanguage } from "@/lib/context/language-context";

// Extend Window interface to include Commutes
declare global {
  interface Window {
    Commutes: any;
  }
}

// Use environment variable for API key
const GOOGLE_MAPS_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "";

// Office data
const officeData = {
  italy: {
    name: "Hand Line Company s.r.l.",
    address: "via Antonio Bruse 34, 22035, Canzo (CO), Italy",
    phone: "+39 031 123 4567",
    email: "info@handlineco.com",
    location: {
      lat: 45.8686, // Canzo, Italy coordinates
      lng: 9.2715
    }
  },
  uk: {
    name: "Hand Line Company s.r.l.",
    address: "121 London Road, London, EC1V 2NX",
    phone: "+44 1279 421947",
    email: "info@handlineco.com", 
    location: {
      lat: 51.5074, // London coordinates
      lng: -0.1278
    }
  }
};

// Travel modes
const TravelMode = {
  DRIVING: 'DRIVING',
  TRANSIT: 'TRANSIT',
  BICYCLING: 'BICYCLING',
  WALKING: 'WALKING',
};

export function ContactInfo() {
  const { t } = useLanguage();
  const mapRef = useRef<HTMLDivElement>(null);
  const initialStatePanelRef = useRef<HTMLDivElement>(null);
  const destinationPanelRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const svgContainerRef = useRef<HTMLDivElement>(null);
  const [isDesktop, setIsDesktop] = useState(false);
  const [selectedOffice, setSelectedOffice] = useState<'italy' | 'uk'>('italy');
  const [isDarkMode, setIsDarkMode] = useState(false);
  
  // Get current office data
  const currentOffice = officeData[selectedOffice];
  
  // Responsive check for desktop
  useEffect(() => {
    const checkDesktop = () => {
      setIsDesktop(window.innerWidth >= 768); // Tailwind md: breakpoint
    };
    checkDesktop();
    window.addEventListener('resize', checkDesktop);
    return () => window.removeEventListener('resize', checkDesktop);
  }, []);

  // Dark mode check
  useEffect(() => {
    const checkDarkMode = () => {
      setIsDarkMode(document.documentElement.classList.contains('dark'));
    };
    checkDarkMode();
    
    // Watch for theme changes
    const observer = new MutationObserver(checkDarkMode);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class']
    });
    
    return () => observer.disconnect();
  }, []);

  // Only initialise map/Commutes on desktop
  useEffect(() => {
    if (!isDesktop) return;
    // Create the SVG icons that will be used by the commutes widget
    const createSvgIcons = () => {
      if (!svgContainerRef.current) return;
      
      svgContainerRef.current.innerHTML = `
        <svg class="hide">
          <defs>
            <symbol id="commutes-initial-icon">
              <path d="M41 20H18.6c-9.5 0-10.8 13.5 0 13.5h14.5C41 33.5 41 45 33 45H17.7" stroke="#D2E3FC" stroke-width="5"></path>
              <path d="M41 22c.2 0 .4 0 .6-.2l.4-.5c.3-1 .7-1.7 1.1-2.5l2-3c.8-1 1.5-2 2-3 .6-1 .9-2.3.9-3.8 0-2-.7-3.6-2-5-1.4-1.3-3-2-5-2s-3.6.7-5 2c-1.3 1.4-2 3-2 5 0 1.4.3 2.6.8 3.6s1.2 2 2 3.2c.9 1 1.6 2 2 2.8.5.9 1 1.7 1.2 2.7l.4.5.6.2Zm0-10.5c-.7 0-1.3-.2-1.8-.7-.5-.5-.7-1.1-.7-1.8s.2-1.3.7-1.8c.5-.5 1.1-.7 1.8-.7s1.3.2 1.8.7c.5.5.7 1.1.7 1.8s-.2 1.3-.7 1.8c-.5.5-1.1.7-1.8.7Z" fill="#185ABC"></path>
              <path d="m12 32-8 6v12h5v-7h6v7h5V38l-8-6Z" fill="#4285F4"></path>
            </symbol>
            <symbol id="commutes-add-icon">
              <path d="M0 0h24v24H0V0z" fill="none"/>
              <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
            </symbol>
            <symbol id="commutes-driving-icon">
              <path d="M0 0h24v24H0V0z" fill="none"/>
              <path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.85 7h10.29l1.08 3.11H5.77L6.85 7zM19 17H5v-5h14v5z"/>
              <circle cx="7.5" cy="14.5" r="1.5"/>
              <circle cx="16.5" cy="14.5" r="1.5"/>
            </symbol>
            <symbol id="commutes-transit-icon">
              <path d="M0 0h24v24H0V0z" fill="none"/>
              <path d="M12 2c-4 0-8 .5-8 4v9.5C4 17.43 5.57 19 7.5 19L6 20.5v.5h12v-.5L16.5 19c1.93 0 3.5-1.57 3.5-3.5V6c0-3.5-3.58-4-8-4zm5.66 3H6.43c.61-.52 2.06-1 5.57-1 3.71 0 5.12.46 5.66 1zM11 7v3H6V7h5zm2 0h5v3h-5V7zm3.5 10h-9c-.83 0-1.5-.67-1.5-1.5V12h12v3.5c0 .83-.67 1.5-1.5 1.5z"/>
              <circle cx="8.5" cy="14.5" r="1.5"/>
              <circle cx="15.5" cy="14.5" r="1.5"/>
            </symbol>
            <symbol id="commutes-bicycling-icon">
              <path d="M0 0h24v24H0V0z" fill="none"/>
              <path d="M15.5 5.5c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zM5 12c-2.8 0-5 2.2-5 5s2.2 5 5 5 5-2.2 5-5-2.2-5-5-5zm0 8.5c-1.9 0-3.5-1.6-3.5-3.5s1.6-3.5 3.5-3.5 3.5 1.6 3.5 3.5-1.6 3.5-3.5 3.5zm5.8-10l2.4-2.4.8.8c1.3 1.3 3 2.1 5.1 2.1V9c-1.5 0-2.7-.6-3.6-1.5l-1.9-1.9c-.5-.4-1-.6-1.6-.6s-1.1.2-1.4.6L7.8 8.4c-.4.4-.6.9-.6 1.4 0 .6.2 1.1.6 1.4L11 14v5h2v-6.2l-2.2-2.3zM19 12c-2.8 0-5 2.2-5 5s2.2 5 5 5 5-2.2 5-5-2.2-5-5-5zm0 8.5c-1.9 0-3.5-1.6-3.5-3.5s1.6-3.5 3.5-3.5 3.5 1.6 3.5 3.5-1.6 3.5-3.5 3.5z"/>
            </symbol>
            <symbol id="commutes-walking-icon">
              <path d="M0 0h24v24H0V0z" fill="none"/>
              <path d="M13.5 5.5c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zM9.8 8.9L7 23h2.1l1.8-8 2.1 2v6h2v-7.5l-2.1-2 .6-3C14.8 12 16.8 13 19 13v-2c-1.9 0-3.5-1-4.3-2.4l-1-1.6c-.56-.89-1.68-1.25-2.65-.84L6 8.3V13h2V9.6l1.8-.7"/>
            </symbol>
            <symbol id="commutes-arrow-icon">
              <path d="M0 0h24v24H0V0z" fill="none"/>
              <path d="M16.01 11H4v2h12.01v3L20 12l-3.99-4v3z"/>
            </symbol>
            <symbol id="commutes-directions-icon">
              <path d="M0 0h24v24H0V0z" fill="none"/>
              <path d="M22.43 10.59l-9.01-9.01c-.75-.75-2.07-.76-2.83 0l-9 9c-.78.78-.78 2.04 0 2.82l9 9c.39.39.9.58 1.41.58.51 0 1.02-.19 1.41-.58l8.99-8.99c.79-.76.8-2.02.03-2.82zm-10.42 10.4l-9-9 9-9 9 9-9 9zM8 11v4h2v-3h4v2.5l3.5-3.5L14 7.5V10H9c-.55 0-1 .45-1 1z"/>
            </symbol>
            <symbol id="commutes-edit-icon">
              <path d="M0 0h24v24H0V0z" fill="none"/>
              <path d="M14.06 9.02l.92.92L5.92 19H5v-.92l9.06-9.06M17.66 3c-.25 0-.51.1-.7.29l-1.83 1.83 3.75 3.75 1.83-1.83c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.2-.2-.45-.29-.71-.29zm-3.6 3.19L3 17.25V21h3.75L17.81 9.94l-3.75-3.75z"/>
            </symbol>
            <symbol id="commutes-chevron-left-icon">
              <path d="M0 0h24v24H0V0z" fill="none"/>
              <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12l4.58-4.59z"/>
            </symbol>
            <symbol id="commutes-chevron-right-icon">
              <path d="M0 0h24v24H0V0z" fill="none"/>
              <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6-6-6z"/>
            </symbol>
          </defs>
        </svg>
      `;
    };
    
    // Load the Google Maps API and initialize the map
    const loadGoogleMapsAPI = () => {
      if (window.google && window.google.maps) {
        initMap();
        return;
      }
      
      const googleMapScript = document.createElement('script');
      googleMapScript.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}&libraries=places,geometry`;
      googleMapScript.async = true;
      googleMapScript.defer = true;
      googleMapScript.onload = initMap;
      window.document.body.appendChild(googleMapScript);
    };
    
    // Initialize the map and commutes widget
    const initMap = () => {
      if (!mapRef.current) return;
      
      const mapOptions = {
        center: currentOffice.location,
        zoom: 5,
        zoomControl: true,
        mapTypeControl: false,
        streetViewControl: false,
        fullscreenControl: true,
        mapId: "",
      };
      
      const map = new google.maps.Map(mapRef.current, mapOptions);
      
      // Create new Commutes widget with configuration
      const commutesConfig = {
        defaultTravelMode: "DRIVING",
        distanceMeasurementType: "IMPERIAL",
        mapOptions: {
          center: currentOffice.location,
          fullscreenControl: true,
          mapTypeControl: false,
          streetViewControl: false,
          zoom: 13,
          zoomControl: true,
          maxZoom: 20,
          mapId: "",
        },
        mapsApiKey: GOOGLE_MAPS_API_KEY,
        officeName: currentOffice.name,
        officeAddress: currentOffice.address,
        directionsTitle: t('contact.info.directionsTitle'),
        directionsDescription: selectedOffice === 'italy' ? t('contact.info.directionsDescription') : t('contact.info.directionsDescriptionUK')
      };
      
      // Initialize the Commutes functionality
      new window.Commutes(commutesConfig);
    };
    
    // Inject the Commutes functionality into the global window object
    const injectCommutesScript = () => {
      const commutesScript = document.createElement('script');
      commutesScript.textContent = `
        window.Commutes = function(configuration) {
          let commutesMap;
          let activeDestinationIndex;
          let origin = configuration.mapOptions.center;
          let destinations = configuration.destination || [];
          let markerIndex = 0;
          let lastActiveEl;
          
          const markerIconConfig = {
            path: 'M10 27c-.2 0-.2 0-.5-1-.3-.8-.7-2-1.6-3.5-1-1.5-2-2.7-3-3.8-2.2-2.8-3.9-5-3.9-8.8C1 4.9 5 1 10 1s9 4 9 8.9c0 3.9-1.8 6-4 8.8-1 1.2-1.9 2.4-2.8 3.8-1 1.5-1.4 2.7-1.6 3.5-.3 1-.4 1-.6 1Z',
            fillOpacity: 1,
            strokeWeight: 1,
            anchor: new google.maps.Point(15, 29),
            scale: 1.2,
            labelOrigin: new google.maps.Point(10, 9),
          };
          
          // Create marker for origin
          const originMarkerIcon = {
            ...markerIconConfig,
            fillColor: '#F08515',
            strokeColor: '#E07513',
          };
          
          // Initialize the map first
          try {
            const mapElement = document.querySelector('.map-view');
            commutesMap = new google.maps.Map(mapElement, configuration.mapOptions);
            
            // Create marker for company location using the initialized map
            const marker = new google.maps.Marker({
              position: origin,
              map: commutesMap,
              icon: originMarkerIcon,
              label: {
                text: '●',
                fontFamily: 'Montserrat, Arial, sans-serif',
                color: '#FFFFFF',
                fontSize: '20px',
                className: 'origin-pin-label'
              }
            });

            // Create info window for the marker
            const infoWindow = new google.maps.InfoWindow({
              content: \`<div style="font-family: Montserrat, Arial, sans-serif; padding: 8px;"><strong>\${configuration.officeName || 'Hand Line Company s.r.l.'}</strong><br>\${configuration.officeAddress || origin}</div>\`
            });
            
            // Open info window by default
            infoWindow.open(commutesMap, marker);
            
            // Add event listeners to marker for toggling info window
            marker.addListener('click', () => {
              infoWindow.open(commutesMap, marker);
            });
            
            // Add event listener to the add destination button
            const addDestinationBtn = document.querySelector('.add-button');
            if (addDestinationBtn) {
              addDestinationBtn.addEventListener('click', () => {
                // Use browser's geolocation to get user's current location
                if (navigator.geolocation) {
                  navigator.geolocation.getCurrentPosition(
                    (position) => {
                      const userLocation = {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude
                      };
                      
                      // Calculate and display route
                      const directionsService = new google.maps.DirectionsService();
                      const directionsRenderer = new google.maps.DirectionsRenderer({
                        map: commutesMap,
                        suppressMarkers: false
                      });
                      
                      directionsService.route({
                        origin: userLocation,
                        destination: origin,
                        travelMode: google.maps.TravelMode.DRIVING
                      }, (result, status) => {
                        if (status === google.maps.DirectionsStatus.OK) {
                          directionsRenderer.setDirections(result);
                          
                          // Display travel info in the commutes info panel
                          const route = result.routes[0];
                          const leg = route.legs[0];
                          const durationText = leg.duration.text;
                          const distanceText = leg.distance.text;
                          
                          const infoPanel = document.querySelector('.description');
                          if (infoPanel) {
                            infoPanel.innerHTML = \`
                              <h1 class="heading" style="font: 14px Montserrat, Arial, sans-serif; margin: 0;">
                                \${configuration.directionsTitle || 'Travel to Hand Line Company'}
                              </h1>
                              <p style="font: 12px Open Sans, Arial, sans-serif; margin: 5px 0;">
                                \${configuration.directionsDescription || 'Get directions to our main facility'}
                              </p>
                            \`;
                          }
                        } else {
                          console.error('Directions request failed due to ' + status);
                        }
                      });
                    },
                    (error) => {
                      console.error('Error getting user location:', error);
                      alert('Could not get your location. Please check your location settings and try again.');
                    }
                  );
                } else {
                  alert('Geolocation is not supported by this browser.');
                }
              });
            }
          } catch (error) {
            console.error('Error initializing Google Maps:', error);
          }
        }
      `;
      
      document.head.appendChild(commutesScript);
    };
    
    createSvgIcons();
    injectCommutesScript();
    loadGoogleMapsAPI();
    
    // Clean up when component unmounts
    return () => {
      const scripts = document.querySelectorAll('script[src*="maps.googleapis.com"]');
      scripts.forEach(script => {
        if (script.parentNode) {
          script.parentNode.removeChild(script);
        }
      });
    };
  }, [isDesktop, selectedOffice, currentOffice]);
  
  const contactInfo = [
    {
      icon: Building2,
      title: t('contact.info.address.title'),
      content: selectedOffice === 'italy' ? t('contact.info.address.content') : t('contact.info.address.contentUK'),
    },
    {
      icon: Phone,
      title: t('contact.info.phone.title'),
      content: selectedOffice === 'italy' ? t('contact.info.phone.content') : t('contact.info.phone.contentUK'),
    },
    {
      icon: Mail,
      title: t('contact.info.email.title'),
      content: t('contact.info.email.content'),
    },
  ];

  return (
    <div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mb-8 text-left"
        id="contact-information"
        style={{ scrollMarginTop: "100px" }}
      >
        <h2 className="text-2xl font-bold tracking-tight text-brand-dark dark:text-white mb-2">{t('contact.info.title')}</h2>
        <p className="text-brand-secondary dark:text-gray-300 mb-6">{t('contact.info.description')}</p>
      </motion.div>
      <div className="space-y-6">
        <Card className="p-6 bg-white dark:bg-black/50 border-brand-primary/10 dark:border-brand-primary/20 shadow-sm backdrop-blur-sm">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-semibold text-brand-dark dark:text-white">{t('contact.info.contactInfoTitle')}</h3>
            
            {/* Office Switcher */}
            <div className="flex items-center gap-2">
              <span className="text-sm text-brand-secondary dark:text-gray-300">{t('contact.info.offices.switchLabel')}:</span>
              <div className="flex bg-white dark:bg-gray-800 rounded-lg p-1 border border-brand-primary/10 dark:border-brand-primary/20">
                <button
                  onClick={() => setSelectedOffice('italy')}
                  className={`px-3 py-1 text-sm rounded-md transition-colors ${
                    selectedOffice === 'italy'
                      ? 'bg-brand-primary text-white'
                      : 'text-brand-secondary dark:text-gray-300 hover:text-brand-dark dark:hover:text-white'
                  }`}
                >
                  {t('contact.info.offices.italy')}
                </button>
                <button
                  onClick={() => setSelectedOffice('uk')}
                  className={`px-3 py-1 text-sm rounded-md transition-colors ${
                    selectedOffice === 'uk'
                      ? 'bg-brand-primary text-white'
                      : 'text-brand-secondary dark:text-gray-300 hover:text-brand-dark dark:hover:text-white'
                  }`}
                >
                  {t('contact.info.offices.uk')}
                </button>
              </div>
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="flex items-start gap-3">
              <Building2 className="h-5 w-5 text-brand-primary mt-1" />
              <div>
                <div className="font-medium text-brand-dark dark:text-white">{t('contact.info.address.title')}</div>
                <div className="text-brand-secondary dark:text-gray-300">
                  {selectedOffice === 'italy' ? t('contact.info.address.content') : t('contact.info.address.contentUK')}
                </div>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Phone className="h-5 w-5 text-brand-primary mt-1" />
              <div>
                <div className="font-medium text-brand-dark dark:text-white">{t('contact.info.phone.title')}</div>
                <div className="text-brand-secondary dark:text-gray-300">
                  {selectedOffice === 'italy' ? t('contact.info.phone.content') : t('contact.info.phone.contentUK')}
                </div>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Mail className="h-5 w-5 text-brand-primary mt-1" />
              <div>
                <div className="font-medium text-brand-dark dark:text-white">{t('contact.info.email.title')}</div>
                <div className="text-brand-secondary dark:text-gray-300">{t('contact.info.email.content')}</div>
              </div>
            </div>
          </div>
        </Card>
        
        <Card className="p-6 bg-white dark:bg-black/50 border-brand-primary/10 dark:border-brand-primary/20 shadow-sm backdrop-blur-sm">
          <h3 className="text-xl font-semibold mb-4 text-brand-dark dark:text-white">{t('contact.info.findUsTitle')}</h3>
          
          {/* Commutes widget container for desktop only */}
          <div ref={svgContainerRef} style={{ display: 'none' }} />
          
          {isDesktop ? (
            <div className="commutes" style={{ height: '400px', position: 'relative', overflow: 'hidden', borderRadius: '0.5rem' }}>
              <div className="commutes-map" style={{ flex: 1, position: 'relative', width: '100%', height: '100%' }}>
                <div ref={mapRef} className="map-view" style={{ backgroundColor: 'rgb(229, 227, 223)', height: '100%', left: 0, position: 'absolute', top: 0, width: '100%' }} />
              </div>
              
              <div className="commutes-info" style={{ 
                flex: '0 0 110px',
                maxWidth: '100%',
                overflow: 'hidden',
                position: 'absolute',
                bottom: 0,
                width: '100%',
                backgroundColor: isDarkMode ? 'rgba(0, 0, 0, 0.9)' : 'rgba(255, 255, 255, 0.9)',
                backdropFilter: 'blur(10px)',
                borderTopLeftRadius: '0.5rem',
                borderTopRightRadius: '0.5rem',
                boxShadow: '0 -2px 10px rgba(0, 0, 0, 0.1)'
              }}>
                <div 
                  ref={initialStatePanelRef} 
                  className="commutes-initial-state" 
                  style={{
                    borderRadius: '8px',
                    border: 'none',
                    display: 'flex',
                    height: '80px',
                    marginTop: '8px',
                    padding: '0 16px'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                    <div style={{ 
                      width: '58px', 
                      height: '58px', 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'center', 
                      marginRight: '10px',
                      flexShrink: 0 
                    }}>
                      <svg 
                        aria-label="Directions Icon" 
                        width="50px"
                        height="50px"
                        viewBox="0 0 60 60" 
                        fill="none" 
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M38 22H15.6c-9.5 0-10.8 13.5 0 13.5h14.5C38 35.5 38 47 30 47H14.7" stroke="#F08515" strokeWidth="4"></path>
                        <path d="M38 24c.2 0 .4 0 .6-.2l.4-.5c.3-1 .7-1.7 1.1-2.5l2-3c.8-1 1.5-2 2-3 .6-1 .9-2.3.9-3.8 0-2-.7-3.6-2-5-1.4-1.3-3-2-5-2s-3.6.7-5 2c-1.3 1.4-2 3-2 5 0 1.4.3 2.6.8 3.6s1.2 2 2 3.2c.9 1 1.6 2 2 2.8.5.9 1 1.7 1.2 2.7l.4.5.6.2Zm0-10.5c-.7 0-1.3-.2-1.8-.7-.5-.5-.7-1.1-.7-1.8s.2-1.3.7-1.8c.5-.5 1.1-.7 1.8-.7s1.3.2 1.8.7c.5.5.7 1.1.7 1.8s-.2 1.3-.7 1.8c-.5.5-1.1.7-1.8.7Z" fill="#F08515"></path>
                        <path d="m12 35-7 5v10h4v-6h6v6h4V40l-7-5Z" fill="#F08515"></path>
                      </svg>
                    </div>
                    
                    <div className="description" style={{ flexGrow: 1, minWidth: 0, padding: '0 10px' }}>
                      <h1 className="heading" style={{ font: '14px Montserrat, Arial, sans-serif', margin: 0, color: isDarkMode ? '#FFFFFF' : '#1E1E1E', lineHeight: '1.3' }}>
                        {t('contact.info.directionsTitle')}
                      </h1>
                      <p style={{ color: isDarkMode ? '#D1D5DB' : '#5A5A5A', font: '12px Open Sans, Arial, sans-serif', margin: '4px 0 0 0', lineHeight: '1.3' }}>
                        {selectedOffice === 'italy' ? t('contact.info.directionsDescription') : t('contact.info.directionsDescriptionUK')}
                      </p>
                    </div>
                    
                    <button
                      className="add-button"
                      style={{
                        backgroundColor: '#F08515',
                        borderColor: '#F08515',
                        borderRadius: '4px',
                        borderStyle: 'solid',
                        color: '#fff',
                        cursor: 'pointer',
                        display: 'inline-flex',
                        alignItems: 'center',
                        fill: '#fff',
                        padding: '8px 12px',
                        whiteSpace: 'nowrap',
                        flexShrink: 0,
                        height: '36px'
                      }}
                    >
                      <svg 
                        aria-label="Add Icon" 
                        width="16px" 
                        height="16px" 
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
                      </svg>
                      <span style={{ font: 'normal 600 13px/16px Montserrat, Arial, sans-serif', paddingLeft: '6px' }}>
                        {t('contact.info.directionsButton')}
                      </span>
                    </button>
                  </div>
                </div>
                
                <div 
                  ref={destinationPanelRef} 
                  className="commutes-destinations"
                  style={{ display: 'none', position: 'relative', width: '100%' }}
                />
              </div>
            </div>
          ) : (
            // Mobile: show static map image or simple Google Maps embed
            <div className="w-full max-w-[95vw] mx-auto rounded-lg overflow-hidden h-56 sm:h-64" style={{ background: '#e5e3df', position: 'relative' }}>
              <a
                href={`https://www.google.com/maps/place/${currentOffice.address.replace(/ /g, '+')}`}
                target="_blank" rel="noopener noreferrer"
                aria-label="Open HandLine Safety location in Google Maps"
              >
                <img
                  src={`https://maps.googleapis.com/maps/api/staticmap?center=${currentOffice.location.lat},${currentOffice.location.lng}&zoom=13&size=600x300&markers=color:orange%7C${currentOffice.location.lat},${currentOffice.location.lng}&key=${GOOGLE_MAPS_API_KEY}`}
                  alt={`${currentOffice.name} location map`}
                  className="w-full h-full object-cover"
                  style={{ minHeight: '100%', minWidth: '100%' }}
                  onError={e => { (e.target as HTMLImageElement).src = '/static/map-fallback.jpg'; }}
                />
              </a>
            </div>
          )}
          {/* Modal container for desktop only */}
          {isDesktop && (
            <div ref={modalRef} className="commutes-modal-container" style={{ alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.4)', display: 'none', height: '100%', justifyContent: 'center', left: 0, position: 'fixed', top: 0, width: '100%', zIndex: 1000 }} />
          )}
        </Card>
      </div>
      
      {/* Add required styles for the commutes widget */}
      <style jsx>{`
        .commutes {
          align-content: stretch;
          color: #1E1E1E;
          display: flex;
          flex-direction: column;
          flex-wrap: wrap;
          font-family: Montserrat, Arial, sans-serif;
          height: 100%;
          min-height: 256px;
          min-width: 360px;
          overflow: auto;
          width: 100%;
        }
      `}</style>
    </div>
  );
} 