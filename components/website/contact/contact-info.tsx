"use client";

import React, { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { MapPin, Phone, Mail, Building2 } from "lucide-react";
import { useLanguage } from "@/lib/context/language-context";
import { motion } from "framer-motion";

// Office data
const officeData = {
  italy: {
    name: "Hand Line Company s.r.l.",
    address: "via Antonio Brusa 34, 22035, Canzo (CO), Italy",
    phone: "+39 031 6121961",
    email: "info@handlineco.com",
    location: {
      lat: 45.8686, // Fallback: Canzo, Italy centre
      lng: 9.2715
    }
  },
  uk: {
    name: "Hand Line Company s.r.l.",
    address: "52 Grosvenor Gardens, London SW1W 0AU, United Kingdom",
    phone: "+44 020 7866 3849",
    email: "info@handlineco.com", 
    location: {
      lat: 51.5074, // London coordinates
      lng: -0.1278
    }
  }
};

type OfficeKey = 'italy' | 'uk';

type Coordinates = { lat: number; lng: number };

async function geocodeAddress(address: string): Promise<Coordinates | null> {
  try {
    const params = new URLSearchParams({
      q: address,
      format: "json",
      limit: "1",
    });
    const response = await fetch(`https://nominatim.openstreetmap.org/search?${params.toString()}`, {
      headers: {
        // OSM identifies clients via Referer; browsers do not allow custom User-Agent
        "Accept-Language": "en",
      },
    });
    if (!response.ok) return null;
    const data: Array<{ lat: string; lon: string }> = await response.json();
    if (!Array.isArray(data) || data.length === 0) return null;
    const item = data[0];
    const lat = parseFloat(item.lat);
    const lng = parseFloat(item.lon);
    if (Number.isNaN(lat) || Number.isNaN(lng)) return null;
    return { lat, lng };
  } catch {
    return null;
  }
}

export function ContactInfo() {
  const { t } = useLanguage();
  const [selectedOffice, setSelectedOffice] = useState<OfficeKey>('italy');
  const [coordsByOffice, setCoordsByOffice] = useState<Record<OfficeKey, Coordinates>>({
    italy: officeData.italy.location,
    uk: officeData.uk.location,
  });
  
  // Get current office data
  const currentOffice = officeData[selectedOffice];

  useEffect(() => {
    let isActive = true;
    const address = currentOffice.address;
    // Only attempt geocoding for known physical addresses
    geocodeAddress(address).then((result) => {
      if (result && isActive) {
        setCoordsByOffice((prev) => ({ ...prev, [selectedOffice]: result }));
      }
    });
    return () => {
      isActive = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedOffice]);

  const getStaticMapUrl = (coords: Coordinates) => {
    const { lat, lng } = coords;
    return `https://www.openstreetmap.org/export/embed.html?bbox=${lng-0.01}%2C${lat-0.01}%2C${lng+0.01}%2C${lat+0.01}&layer=mapnik&marker=${lat}%2C${lng}`;
  };
  
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
        <Card className="p-6 bg-white dark:bg-black/50 border-0 shadow-sm backdrop-blur-sm">
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
            {/* Registered Office */}
            <div className="flex items-start gap-3">
              <Building2 className="h-5 w-5 text-brand-primary mt-1" />
              <div>
                <div className="font-medium text-brand-dark dark:text-white">
                  {selectedOffice === 'italy' ? t('contact.info.address.title') : t('contact.info.address.titleUK')}
                </div>
                <div className="text-brand-secondary dark:text-gray-300">
                  {selectedOffice === 'italy' ? t('contact.info.address.content') : t('contact.info.address.contentUK')}
                </div>
              </div>
            </div>

            {/* Operational Location */}
            {selectedOffice === 'italy' && (
              <div className="flex items-start gap-3">
                <Building2 className="h-5 w-5 text-brand-primary mt-1" />
                <div>
                  <div className="font-medium text-brand-dark dark:text-white">{t('contact.info.address.operationalTitle')}</div>
                  <div className="text-brand-secondary dark:text-gray-300">
                    {t('contact.info.address.operationalContent')}
                  </div>
                </div>
              </div>
            )}
            
            {/* Phone Number */}
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
        
        <Card className="p-6 bg-white dark:bg-black/50 border-0 shadow-sm backdrop-blur-sm">
          <h3 className="text-xl font-semibold mb-4 text-brand-dark dark:text-white">{t('contact.info.findUsTitle')}</h3>

          {/* OpenStreetMap iframe replacing Google Maps */}
          <div className="w-full max-w-[95vw] mx-auto rounded-lg overflow-hidden h-56 sm:h-64" style={{ background: '#e5e3df', position: 'relative' }}>
            <iframe
              src={getStaticMapUrl(coordsByOffice[selectedOffice])}
              className="w-full h-full object-cover"
              style={{ minHeight: '100%', minWidth: '100%', border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title={`Map showing ${currentOffice.name} location`}
            />
          </div>
        </Card>
      </div>
    </div>
  );
} 