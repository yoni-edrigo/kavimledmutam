import { useEffect, useState } from 'react';
import './App.css';
import { Hero } from './components/hero';
import { Staff } from './components/staff';
function App() {
  // const [fallenStories, setFallenStories] = useState();
  const [staffData, setStaffData] = useState();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          'https://yonivas0.editorx.io/kavimledmutam/_functions/getData'
        );
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        // If you expect JSON response, use response.json()
        // If you expect other response types, adjust accordingly
        const data = await response.json();
        // setFallenStories(data.message[0])
        setStaffData(data.message[1]);
        console.log('data.message', data.message);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);
  return (
    <div
      className="min-h-screen"
      style={{
        display: 'grid',
        gridTemplateRows: 'repeat(2,minmax(100svh,min-content))',
      }}
    >
      <Hero />
      {staffData && <Staff staffData={staffData} />}
      <h3 className="fixed bottom-0 mr-7">האתר בבנייה, תודה על הסבלנות!</h3>
    </div>
  );
}

export default App;
