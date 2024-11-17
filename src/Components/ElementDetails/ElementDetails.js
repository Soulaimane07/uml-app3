import { useDispatch, useSelector } from "react-redux";
import { addAttributeToElement, removeAttributeFromElement, removeElement, updateElementLabel, addMethodToElement, removeMethodFromElement, selectNotElement } from "../../Redux/Slices/DiagramSlice";
import { useEffect, useState } from "react";
import { getVisibilityIcon } from "../Nodes/Nodes";
import { IoTrash } from "react-icons/io5";

const ElementDetails = () => {
  const dispatch = useDispatch();
  const element = useSelector((state) => state.diagram.selectedElement);

  const [newLabel, setNewLabel] = useState(element?.data.label);
  const [newAttribute, setNewAttribute] = useState({ name: '', visibility: 'private', type: 'String' });
  const [newMethod, setNewMethod] = useState({ name: '', returnType: 'Void', visibility: 'public' });

  useEffect(() => {
    if (element?.id) {
      dispatch(updateElementLabel({ id: element.id, label: newLabel }));
    }
  }, [newLabel, dispatch, element?.id]);

  const handleAddAttribute = () => {
    if (newAttribute.name.trim() === '') return; // Prevent adding empty attribute
    const attribute = { name: newAttribute.name, visibility: newAttribute.visibility, type: newAttribute.type };
    dispatch(addAttributeToElement({ elementId: element.id, attribute }));
    setNewAttribute({ name: '', visibility: 'private', type: 'String' });
  };

  const handleDeleteAttribute = (attributeName) => {
    dispatch(removeAttributeFromElement({ elementId: element.id, attributeName }));
  };

  const handleAddMethod = () => {
    if (newMethod.name.trim() === '') return; // Prevent adding empty method
    const method = { name: newMethod.name, returnType: newMethod.returnType, visibility: newMethod.visibility };
    dispatch(addMethodToElement({ elementId: element.id, method }));
    setNewMethod({ name: '', returnType: 'String', visibility: 'private' });
  };

  const handleDeleteMethod = (methodName) => {
    dispatch(removeMethodFromElement({ elementId: element.id, methodName }));
  };

  return (
    <div 
        className="element-details overflow-y-scroll w-1/4 flex flex-col justify-between py-8 px-6"
        onMouseLeave={()=> dispatch(selectNotElement())}
    >
      <div>
        <h3 className="flex space-x-2 justify-center text-center font-medium text-2xl mb-4">
          <p className="first-letter:uppercase">{element?.type}</p>
          <p>Details</p>
        </h3>

        <div className="mb-6">
          <input
            value={newLabel}
            onChange={(e) => setNewLabel(e.target.value)}
            type="text"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-cyan-500 focus:border-cyan-500 block w-full p-2.5"
            placeholder={`${element?.type} name`}
          />
        </div>

        {element?.type === "class" &&
            <div className="mb-6">
            <h4 className="block mb-2 text-sm font-medium text-gray-900">Attributes</h4>
            <ul className="px-4 space-y-2">
                {element?.data?.attributes?.map((attr, index) => (
                <div key={index} className="attribute-item flex justify-between items-center">
                    <p>
                    {getVisibilityIcon(attr.visibility)} {attr.name} ({attr.type})
                    </p>
                    <button
                        type="button"
                        onClick={() => handleDeleteAttribute(attr.name)}
                        className="border focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-2.5 py-1.5 text-center border-orange-400 text-orange-400 hover:text-white hover:bg-orange-600 focus:ring-orange-900"
                    >
                    <IoTrash />
                    </button>
                </div>
                ))}
            </ul>

            <div className="mt-4 flex items-stretch space-x-1">
                <input
                    value={newAttribute.name}
                    onChange={(e) => setNewAttribute({ ...newAttribute, name: e.target.value })}
                    type="text"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-cyan-400 focus:border-cyan-400 block w-full p-2.5"
                    placeholder="Attribute Name"
                />
                <select
                value={newAttribute.visibility}
                onChange={(e) => setNewAttribute({ ...newAttribute, visibility: e.target.value })}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-cyan-400 focus:border-cyan-400 block w-20 p-2.5"
                >
                    <option value="public">Public</option>
                    <option value="private">Private</option>
                    <option value="protected">Protected</option>
                </select>
                <select
                value={newAttribute.type}
                onChange={(e) => setNewAttribute({ ...newAttribute, type: e.target.value })}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-cyan-400 focus:border-cyan-400 block w-20 p-2.5"
                >
                    <option value="Int">Int</option>
                    <option value="String">String</option>
                    <option value="Boolean">Boolean</option>
                    <option value="Date">Date</option>
                </select>
            </div>

            <button
                type="button"
                onClick={handleAddAttribute}
                className="w-full mt-2 focus:outline-none text-white focus:ring-4 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 bg-cyan-500 hover:bg-cyan-600 focus:ring-cyan-700"
            >
                Add Attribute
            </button>
            </div>
        }

        {/* Methods Section */}
        <div className="mb-6">
          <h4 className="block mb-2 text-sm font-medium text-gray-900">Methods</h4>
          <ul className="px-4 space-y-2">
            {element?.data?.methods?.map((method, index) => (
              <div key={index} className="method-item flex justify-between items-center">
                <p>
                  {getVisibilityIcon(method.visibility)} {method.name} ({method.returnType})
                </p>
                <button
                  type="button"
                  onClick={() => handleDeleteMethod(method.name)}
                  className="text-orange-700 hover:text-white border border-orange-700 hover:bg-orange-800 focus:ring-4 focus:outline-none focus:ring-orange-300 font-medium rounded-lg text-sm px-2.5 py-1.5 text-center dark:border-orange-500 dark:text-orange-500 dark:hover:text-white dark:hover:bg-orange-600 dark:focus:ring-orange-900"
                >
                  <IoTrash />
                </button>
              </div>
            ))}
          </ul>

          <div className="mt-4 flex items-stretch space-x-1">
            <input
              value={newMethod.name}
              onChange={(e) => setNewMethod({ ...newMethod, name: e.target.value })}
              type="text"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-cyan-500 focus:border-cyan-500 block w-full p-2.5"
              placeholder="Method Name"
            />
            <select
              value={newMethod.returnType}
              onChange={(e) => setNewMethod({ ...newMethod, returnType: e.target.value })}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-cyan-500 focus:border-cyan-500 block w-20 p-2.5"
            >
              <option value="Int">Void</option>
              <option value="Int">Int</option>
              <option value="String">String</option>
              <option value="Boolean">Boolean</option>
              <option value="Date">Date</option>
            </select>
            <select
              value={newMethod.visibility}
              onChange={(e) => setNewMethod({ ...newMethod, visibility: e.target.value })}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-cyan-500 focus:border-cyan-500 block w-20 p-2.5"
            >
              <option value="public">Public</option>
              <option value="private">Private</option>
              <option value="protected">Protected</option>
            </select>
          </div>

          <button
            type="button"
            onClick={handleAddMethod}
            className="w-full mt-2 focus:outline-none text-white focus:ring-4 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 bg-cyan-500 hover:bg-cyan-600 focus:ring-cyan-700"
          >
            Add Method
          </button>
        </div>
      </div>

      <div className="flex justify-center space-x-2 mt-4">
        <button
          onClick={() => dispatch(removeElement({ elementId: element.id }))}
          className="text-white w-full focus:ring-4 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 bg-orange-500 hover:bg-orange-600 focus:ring-orange-800"
        >
          Delete {element?.type}
        </button>
      </div>
    </div>
  );
};

export default ElementDetails;
