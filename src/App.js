import React, { useState } from 'react';
import { ComposableMap, Geographies, Geography } from 'react-simple-maps';
import ReactTooltip from 'react-tooltip';
import './App.css';
const INDIA_TOPO_JSON = require('./india.plant.json');

const PROJECTION_CONFIG = {
  scale: 350,
  center: [78.9629, 22.5937] // always in [East Latitude, North Longitude]
};

const geographyStyle = {
  default: {
    outline: 'none'
  },
  hover: {
    fill: '#ccc',
    transition: 'all 250ms',
    outline: 'none'
  },
  pressed: {
    outline: 'none'
  }
};

// will generate random heatmap data on every call
const getHeatMapData = () => {
  return [
    { id: 'AP', state: 'Andhra Pradesh', value: "Neem(Azadirachta)"},
    { id: 'AR', state: 'Arunachal Pradesh', value: " Myrobalan (Terminalia chebula)"},
    { id: 'AS', state: 'Assam', value: "Camellia sinensis (Tea)"},
    { id: 'BR', state: 'Bihar', value: "Tulsi" },
    { id: 'CT', state: 'Chhattisgarh', value: "Harad (Terminalia chebula)"},
    { id: 'GA', state: 'Goa', value: "Bilimbi (Averrhoa bilimbi)"},
    { id: 'GJ', state: 'Gujarat', value: "Aloe Vera(Aloe barbadensis miller)"},
    { id: 'HR', state: 'Haryana', value: "Aloe Vera (Aloe barbadensis miller)"},
    { id: 'HP', state: 'Himachal Pradesh', value: "Himalayan Yew(Taxus wallichiana)"},
    { id: 'JH', state: 'Jharkhand', value: "Giloy (Tinospora cordifolia)"},
    { id: 'KA', state: 'Karnataka', value: "Amla (Phyllanthus emblica)"},
    { id: 'KL', state: 'Kerala', value: "Turmeric(Curcuma long)"},
    { id: 'MP', state: 'Madhya Pradesh', value: "Ashwagandha(Withania somnifera)"},
    { id: 'MH', state: 'Maharashtra', value: "Senna (Cassia angustifolia)"},
    { id: 'MN', state: 'Manipur', value: "Black Rice (Chak-Hao)"},
    { id: 'ML', state: 'Meghalaya', value: " Khasi Patta (Cinnamomum tamala)"},
    { id: 'MZ', state: 'Mizoram', value: "Zanthoxylum (Timur)"},
    { id: 'NL', state: 'Nagaland', value: "Raja Mircha (Bhut Jolokia)"},
    { id: 'OD', state: 'Odisha', value: "Turmeric (Curcuma longa)"},
    { id: 'PB', state: 'Punjab', value: "Mint (Mentha)"},
    { id: 'RJ', state: 'Rajasthan', value: "Ashwagandha(Withania somnifera)"},
    { id: 'SK', state: 'Sikkim', value: "Yarsagumba (Ophiocordyceps sinensis)"},
    { id: 'TN', state: 'Tamil Nadu', value: "Brahmi(Bacopa monnieri)"},
    { id: 'TG', state: 'Telangana', value: "Moringa (Moringa oleifera)"},
    { id: 'TR', state: 'Tripura', value: "Kalmegh (Andrographis paniculata)"},
    { id: 'UT', state: 'Uttarakhand', value: "Guggul(Commiphora wightii)"},
    { id: 'UP', state: 'Uttar Pradesh', value: "Turmeric" },
    { id: 'WB', state: 'West Bengal', value: "Bitter Melon (Momordica charantia)"},
    { id: 'WB', state: 'West Bengal', value: "Shankhpushpi (Convolvulus pluricaulis)"},
    { id: 'AN', state: 'Andaman and Nicobar Islands', value: " Noni (Morinda citrifolia)"},
    { id: 'CH', state: 'Chandigarh', value: "Mint (Mentha)"},
    { id: 'DN', state: 'Dadra and Nagar Haveli', value: " Punarnava (Boerhavia diffusa)"},
    { id: 'DD', state: 'Daman and Diu', value: "Pudina (Mentha)"},
    { id: 'DL', state: 'Delhi', value: "Amla (Phyllanthus emblica)"},
    { id: 'JK', state: 'Jammu and Kashmir', value: "Saffron (Crocus sativus)"},
    { id: 'LA', state: 'Ladakh', value: "Sea Buckthorn (Hippophae rhamnoides)" },
    { id: 'LD', state: 'Lakshadweep', value: "Coconut (Cocos nucifera)" },
    { id: 'PY', state: 'Puducherry', value: "Adhatoda (Justicia adhatoda)"}
  ];
};

function App() {
  const [tooltipContent, setTooltipContent] = useState('');
  const [data, setData] = useState(getHeatMapData());

  const onMouseEnter = (geo, current = { value: 'NA' }) => {
    return () => {
      setTooltipContent(`${geo.properties.name}: ${current.value}`);
    };
  };

  const onMouseLeave = () => {
    setTooltipContent('');
  };

  return (
    <div className="full-width-height container">
      <h1 className="no-margin center">States and UTs</h1>
      <ReactTooltip>{tooltipContent}</ReactTooltip>
        <ComposableMap
          projectionConfig={PROJECTION_CONFIG}
          projection="geoMercator"
          width={600}
          height={220}
          data-tip=""
        >
          <Geographies geography={INDIA_TOPO_JSON}>
            {({ geographies }) =>
              geographies.map(geo => {
                const current = data.find(s => s.id === geo.id);
                return (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    style={geographyStyle}
                    onMouseEnter={onMouseEnter(geo, current)}
                    onMouseLeave={onMouseLeave}
                  />
                );
              })
            }
          </Geographies>
        </ComposableMap>  
    </div>
  );
}

export default App;