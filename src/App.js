import React, { useState, useEffect } from 'react';
import './App.css';
import { fetchData } from './api';
import ItemsChart from './ItemsChart';
import EnergyGauges from './EnergyGauges';
import FluidsChart from './FluidsChart';

function App() {
    const [data, setData] = useState(null);

    useEffect(() => {
      const getData = async () => {
          const result = await fetchData();
          console.log('Fetched Data:', result); // Debugging
          setData(result);
      };
  
      getData();
      const interval = setInterval(getData, 10000); // Fetch every 10 seconds
      return () => clearInterval(interval); // Cleanup
  }, []);   

    if (!data || !data.items || !data.fluids || !data.energy) {
      return <div>No data available</div>;
    }

    return (
        <div className="App">
            <h1>AE2 Network Visualizer</h1>
            <ItemsChart items={data.items} />
            <EnergyGauges energy={data.energy} />
            <FluidsChart fluids={data.fluids} />
        </div>
    );
}

export default App;
