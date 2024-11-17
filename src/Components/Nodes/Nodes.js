import { useDispatch, useSelector } from "react-redux";
import { selectElement } from "../../Redux/Slices/DiagramSlice";
import { useState } from "react";

export const getVisibilityIcon = (visibility) => {
  switch (visibility) {
    case "public":
      return "+";
    case "private":
      return "-";
    case "protected":
      return "#";
    default:
      return "-";
  }
};

export const ClassNode = ({ id, type, data }) => {
  const dispatch = useDispatch();
  const { label, attributes = [], methods = [] } = data;

  const handleSelect = () => {
    dispatch(selectElement({ id, type, data }));
  };

  const Selement = useSelector(state => state.diagram.selectedElement)

  return (
    <div
      onClick={handleSelect} // Select the element on click
      className={`${Selement?.id === id ? " border-gray-500 bg-white" : "bg-white border-transparent shadow-ms"}  px-4 py-2 shadow-md border-2 text-gray-800 rounded-lg`}
    >
      <div className="flex justify-between items-center">
        <div className="flex w-full relative">
          <p className=" text-sm opacity-50 absolute top-0 left-0"> Class </p>
          <h3 className="font-bold text-lg w-full text-center px-12 pt-3 pb-1">
            {label?.length === 0 ? "Class name" : label}
          </h3>
        </div>
      </div>
      <hr className="bg-black"></hr>
      <div className="mt-2 pb-2">
        <ul className="pl-4">
          {attributes.map((attr, index) => (
            <li key={index}>
              <span className="font-bold">{getVisibilityIcon(attr.visibility)}</span>{" "}
              {attr.name} : {attr.type}
            </li>
          ))}
        </ul>
      </div>
      <hr></hr>
      <div className="mt-2">
        <ul className="pl-4">
          {methods.map((method, index) => (
            <li key={index}>
              <span className="font-bold">{getVisibilityIcon(method.visibility)}</span>{" "}
              {method.name}() : {method.returnType}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export const InterfaceNode = ({ id, type, data }) => {
  const dispatch = useDispatch();

  const handleSelect = () => {
    dispatch(selectElement({ id, type, data }));
  };

  const { label, methods = [] } = data;

  const Selement = useSelector(state => state.diagram.selectedElement)


  return (
    <div
      onClick={handleSelect} // Select the element on click
      className={`${Selement?.id === id ? " border-gray-500 bg-white" : "bg-white border-transparent shadow-ms"}  px-4 py-2 shadow-md border-2 text-gray-800 rounded-lg`}
    >
      <div className="flex justify-between items-center">
        <div className="flex w-full relative">
          <p className=" text-sm opacity-50 absolute top-0 left-0"> Interface </p>
          <h3 className="font-bold text-lg w-full text-center px-14 pt-5 pb-1">
            {label?.length === 0 ? "Interface name" : label}
          </h3>
        </div>
      </div>
      <hr className="bg-black"></hr>
      <div className="mt-2">
        <ul className=" pl-4">
          {methods.map((method, index) => (
            <li key={index}>
              <span className={`font-bold`}>{getVisibilityIcon(method.visibility)}</span>{" "}
              {method.name}() : {method.returnType}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
