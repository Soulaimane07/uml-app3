import React, { useState } from 'react';
import Sidebar from './Components/Sidebar/Sidebar';
import Diagram from './Components/Diagram/Diagram';
import ElementDetails from './Components/ElementDetails/ElementDetails';
import { useSelector } from 'react-redux';
import SaveWork from './Components/Save/SaveWork';
import GenerateBox from './Components/Save/GenerateBox';

const App = () => {
  const elements = useSelector(state => state.diagram.elements)
  const element = useSelector(state => state.diagram.selectedElement)

  const [save, setSave] = useState(false)
  const [generate, setGenerate] = useState(false)
  

  console.log(elements);
  

  return (
    <div className="flex h-screen">
        <Sidebar setSave={setSave} setGenerate={setGenerate} />
        <Diagram />
        {element && <ElementDetails />}

        {save && <SaveWork setSave={setSave} nodes={elements} />}
        {generate && <GenerateBox setGenerate={setGenerate} nodes={elements} />}
    </div>
  );
};

export default App;
