import { useEffect, useState } from "react";
import "./App.css";
import { Hero } from "./assets/components/hero";
import { Staff } from "./assets/components/staff";
export const prefix = "https://static.wixstatic.com/media/";
export const removeUnusedDataFromUrl=(url:string)=>{
  let tempUrl= url.replace('wix:image://v1/',prefix)
  const index= tempUrl.indexOf('.jpg'||'.png'||'.svg')
  tempUrl=tempUrl.slice(0,index+4)
  console.log(tempUrl);
  
  return  tempUrl
  // wix:image://v1/557f26_db69102dd0af435ab2bb8ece5d6fedb5~mv2.jpg/322117720_691162432500140_4412115213330647962_n.jpg__nc_cat=110&ccb=1-7&_nc_sid=efb6e6&_nc#originWidth=880&originHeight=879
  }
function App() {
  const [fallenStories, setFallenStories] = useState();
  const [staffData,setStaffData]=useState()
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://yonivas0.editorx.io/kavimledmutam/_functions/getData"
        );
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        // If you expect JSON response, use response.json()
        // If you expect other response types, adjust accordingly
        const data = await response.json();
        setFallenStories(data.message[0])
        setStaffData(data.message[1])
        console.log("data.message", data.message);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);
  return (
    <div className="min-h-screen" style={{display:'grid',gridTemplateRows:'repeat(2,minmax(100svh,min-content))'}}>
      <Hero/>
      {staffData&&<Staff staffData={staffData}/>}
      <h3 className="fixed bottom-0 mr-7">האתר בבנייה, תודה על הסבלנות!</h3>
    </div>
  );
}

export default App;
