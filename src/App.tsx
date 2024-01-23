
import './App.css'
const isMobile=window.innerWidth<768;
function App() {

  return (
    <div className='min-w-full flex flex-column align-items-center h-full'>
     <div className='absolute' style={{zIndex:'-1',right:isMobile?'':'30%'}}>
      {/* @ts-expect-error model viewer is defined in script in header*/}
       <model-viewer
       src={'https://cdn.jsdelivr.net/gh/yoni-edrigo/3dModel@6a7a8c8326b8b3e37121372404f93a0d7d25690b/candle.glb'}
       shadow-intensity="1" autoplay tone-mapping="commerce"
       />
     </div>
     <h1 className='text-7xl' style={{mixBlendMode:'difference'}}>KAVIM LEDMUTAM</h1>
     <h1>האתר בבנייה</h1>
     
     
    </div>
  )
}

export default App
