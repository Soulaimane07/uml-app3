import { useDispatch, useSelector } from 'react-redux';
import { addElement, importElements } from '../../Redux/Slices/DiagramSlice';
import { MdSaveAlt } from "react-icons/md";
import { TbFileExport  } from "react-icons/tb";
import { useEffect, useState, useRef } from 'react';

import { TfiExport, TfiImport  } from "react-icons/tfi";


const Sidebar = ({setSave, setGenerate}) => {
  const dispatch = useDispatch();

  const handleAddElement = (type) => {
    const id = `${type}-${Date.now()}`;

    let element = {}
  
    if (type === 'class') {
      element = {
        id,
        type,
        position: { x: Math.random() * 300, y: Math.random() * 300 },
        data: {
          label: 'New Class',
          attributes: [
          //   { name: 'id', type: 'int', visibility: 'private' },
          ],
          methods: [
          //   {
          //     name: 'getId',
          //     params: [],
          //     returnType: 'int',
          //     visibility: 'public',
          //   },
          ],
        },
      }
    } else if (type === 'interface') {
      element = {
        id,
        type,
        position: { x: Math.random() * 300, y: Math.random() * 300 },
        data: {
          label: 'New Interface',
          methods: [
          ],
        },
      }
    }

    dispatch(addElement(element))
  };
  

  const elements = useSelector(state => state.diagram.elements)

  const [isReady, setIsReady] = useState(false)

  useEffect(()=> {
    elements?.length === 0 ? setIsReady(true) : setIsReady(false)
  }, [elements])







  const fileInputRef = useRef(null);

  const handleButtonClick = () => {
    fileInputRef.current.click(); // Programmatically trigger the input's click
  };

  

  const [spinner, setSpinner] = useState(false);

  const importJSON = (event) => {
    const file = event.target.files[0];
    
    if (file) {
      setSpinner(true)
      
      setTimeout(() => {
        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const importedData = JSON.parse(e.target.result);
                // setNodes(importedData);
                dispatch(importElements(importedData))
            } catch (error) {
                alert("Invalid JSON file.");
            }
        };
        reader.readAsText(file);
        setSpinner(false)
      }, 1200);
    }
};







  return (
    <div className="w-64 h-full bg-white p-5 py-8 flex flex-col justify-between">
      <div>
        <h1 className="mb-2 text-3xl font-bold w-full text-center">UML</h1>

        <h2 className="mb-2 mt-6 text-sm font-medium opacity-40">Elements</h2>
        <button 
          type="button" 
          onClick={() => handleAddElement('class')}
          className="w-full text-left border focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 border-gray-600 hover:border-cyan-700 text-gray-800 hover:text-white hover:bg-cyan-500 focus:ring-cyan-600"
        >
          Class
        </button>
        <button 
          type="button" 
          onClick={() => handleAddElement('interface')}
          className="w-full text-left border focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 border-gray-600 hover:border-cyan-700 text-gray-800 hover:text-white hover:bg-cyan-500 focus:ring-cyan-600"
        >
          Interface
        </button>

        <h2 className="mb-2 mt-6 text-sm font-medium opacity-40">Edges</h2>
        <button 
          type="button" 
          onClick={() => handleAddElement('class')}
          className="w-full text-left border focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 border-gray-600 hover:border-cyan-700 text-gray-800 hover:text-white hover:bg-cyan-500 focus:ring-cyan-600"
        >
          Association
        </button>
        <button 
          type="button" 
          onClick={() => handleAddElement('interface')}
          className="w-full text-left border focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 border-gray-600 hover:border-cyan-700 text-gray-800 hover:text-white hover:bg-cyan-500 focus:ring-cyan-600"
        >
          Aggregation
        </button>
        <button 
          type="button" 
          onClick={() => handleAddElement('interface')}
          className="w-full text-left border focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 border-gray-600 hover:border-cyan-700 text-gray-800 hover:text-white hover:bg-cyan-500 focus:ring-cyan-600"
        >
          Composition
        </button>
      </div>

      <div>
        <button 
          type="button" 
          disabled={isReady}
          onClick={()=> setGenerate(true)}
          className={`${!isReady ? "bg-cyan-500 hover:bg-cyan-600 focus:outline-none focus:ring-cyan-700" : "bg-gray-300 "} text-white w-full flex items-center space-x-2  focus:ring-4 font-medium rounded-lg text-sm px-5 py-3 me-2 mb-2 `}
        >
          <TbFileExport size={20} />
          <span> Generate code </span>
        </button>

        <button 
          type="button" 
          disabled={isReady}
          onClick={()=> setSave(true)}
          className={`${!isReady ? "bg-cyan-500 hover:bg-cyan-600 focus:outline-none focus:ring-cyan-700" : "bg-gray-300 "} text-white w-full flex items-center space-x-2  focus:ring-4 font-medium rounded-lg text-sm px-5 py-3 me-2 mb-2 `}
        >
          <TfiExport  size={16} />
          <span> Save work </span>
        </button>


        <div>
          <button
            type="button"
            onClick={handleButtonClick} // Call the function that clicks the file input
            className={
              "bg-cyan-500 hover:bg-cyan-600 focus:outline-none focus:ring-cyan-700 justify-between text-white w-full flex items-center space-x-2 focus:ring-4 font-medium rounded-lg text-sm px-5 py-3 me-2 mb-2"
            }
          >
            <div className='flex space-x-2'> 
              <TfiImport size={16} />
              <span> Import work </span>
            </div>

            {spinner &&
                <div role="status">
                    <svg aria-hidden="true" class="w-5 h-5 text-gray-200 animate-spin  fill-sky-500" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                    </svg>
                    <span class="sr-only">Loading...</span>
                </div>
            }
          </button>

          <input
            type="file"
            accept="application/json"
            ref={fileInputRef} // Attach the ref to the input
            onChange={importJSON} // Pass the import handler
            style={{ display: "none" }} // Hide the input
          />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
