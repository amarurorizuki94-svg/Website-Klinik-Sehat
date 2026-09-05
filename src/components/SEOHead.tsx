import React, { useEffect } from 'react';
import { ClinicConfig } from '../types/clinic';

interface SEOHeadProps {
  config: ClinicConfig;
}

export const SEOHead: React.FC<SEOHeadProps> = ({ config }) => {
  useEffect(() => {
    // Generate Schema.org JSON-LD structured data for local medical business
    const schemaData = {
      "@context": "https://schema.org",
      "@type": "MedicalClinic",
      "name": config.name,
      "description": config.tagline,
      "url": window.location.href,
      "telephone": config.phone,
      "priceRange": "$$",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": config.address,
        "addressLocality": config.district,
        "addressRegion": config.city,
        "addressCountry": "ID"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": -6.3000678,
        "longitude": 106.6508933
      },
      "openingHoursSpecification": [
        {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
          "opens": "07:00",
          "closes": "21:00"
        },
        {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": "Saturday",
          "opens": "08:00",
          "closes": "18:00"
        },
        {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": "Sunday",
          "opens": "08:00",
          "closes": "15:00"
        }
      ],
      "availableService": [
        {
          "@type": "MedicalProcedure",
          "name": "Poli Spesialis Anak & Imunisasi"
        },
        {
          "@type": "MedicalProcedure",
          "name": "Poli Kebidanan & USG 4D"
        },
        {
          "@type": "MedicalProcedure",
          "name": "Poli Gigi & Mulut"
        },
        {
          "@type": "MedicalProcedure",
          "name": "Medical Check-Up"
        }
      ]
    };

    const scriptId = 'medical-clinic-jsonld';
    let scriptElem = document.getElementById(scriptId) as HTMLScriptElement | null;
    if (!scriptElem) {
      scriptElem = document.createElement('script');
      scriptElem.id = scriptId;
      scriptElem.type = 'application/ld+json';
      document.head.appendChild(scriptElem);
    }
    scriptElem.textContent = JSON.stringify(schemaData);

  }, [config]);

  return null;
};
