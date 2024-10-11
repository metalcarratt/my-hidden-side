import { useEffect } from 'react'
import './App.css'
import { World } from './world/world'
import { useCritters } from './world/critters'
import { useHover } from './world/hover';
import { Direction, useGlobalSpotlight, useSpotlight } from './world/spotlight';



function App() {
  const { crittersAt, killCritter, moveCritters, killedCritters } = useCritters();
  const { hoverAt } = useHover();
  const { cycleColour, colour } = useGlobalSpotlight();

  const handleKeys = (e: KeyboardEvent) => {
    if (e.key === 'b' || e.key === 'B') {
      // console.log('SHOOT');
      // console.log(hoverAt);
      // console.log(hoverAt && crittersAt(hoverAt))
      if (hoverAt && crittersAt(hoverAt)) {
        // console.log('critter found');
        killCritter(hoverAt, colour);
      }
    }

    if (e.key === 'w' || e.key === 'W' || e.key === 's' || e.key === 'S') {
      cycleColour(Direction.Up);
    }
  }

  const periodic = () => {
    // console.log('moving');
    moveCritters();
    setTimeout(periodic, 1000);
  }

  useEffect(() => {
    document.addEventListener('keydown', handleKeys, true);

    return () => {
      document.removeEventListener('keydown', handleKeys, true);
    }
  }, [hoverAt]);

  useEffect(() => {
    setTimeout(periodic, 500);
  }, []);
  

  return (
    <>
      <p>Killed: {killedCritters}</p>
      <p>B - shoot</p>
      <p>W / S - Change colour</p>
      <World />
    </>
  )
}

export default App
