import React, { useState } from 'react';
import jsPDF from 'jspdf'; // Import jsPDF
import Handlebars from 'handlebars';
import { templates } from './Template/Template';

function GenerateBox({ setGenerate, nodes }) {
    const langs = [
        {
            "title": "Java",
            "image": "/images/java.png"
        },
        {
            "title": "Python",
            "image": "/images/python.png"
        },
        {
            "title": "PHP",
            "image": "/images/web.png"
        }
    ];

    const genres = [
        {
            "title": "PDF",
            "image": "/images/pdf.png"
        },
        {
            "title": "Script",
            "image": "/images/script.png"
        },
    ];
    
    const [lang, setLang] = useState(null);
    const [file, setFile] = useState(null);
    const [spinner, setSpinner] = useState(false);





    

    const generateCode = () => {
        setSpinner(true);
    
        setTimeout(() => {
            const elementsCode = (language) => {
                return nodes.map(node => {
                    const classData = {
                        type: node.type,
                        className: node.data.label,  // class name
                        attributes: node.data.attributes,  // attributes
                        methods: node.data.methods  // methods
                    };
    
                    // Compile the corresponding template for the chosen language
                    const template = Handlebars.compile(templates[language]);
    
                    // Generate code from the template and class data
                    return template(classData);
                }).join("\n\n");  // Joining the generated code pieces for better file formatting
            };

            console.log(lang.title);
            
    
            const downloadCodeFile = () => {
                const codeToDownload = elementsCode(lang.title?.toLowerCase());  // Calling elementsCode to generate code
    
                if (!codeToDownload || !lang) return;
    
                if (file?.title === 'PDF') {
                    // Create a PDF with jsPDF
                    const doc = new jsPDF();
                    doc.setFontSize(10);
                    doc.text(codeToDownload, 10, 10);
                    doc.save('GeneratedCode.pdf');
                } else {
                    // Create a text file for other file types
                    const fileExtension = lang?.title === 'Java' ? 'java' : lang?.title === 'Python' ? 'py' : 'php';
                    const blob = new Blob([codeToDownload], { type: 'text/plain' });
                    const link = document.createElement('a');
                    link.href = URL.createObjectURL(blob);
                    link.download = `GeneratedCode.${fileExtension}`;
                    link.click();
                    URL.revokeObjectURL(link.href);
                }
            };
    
            downloadCodeFile();
            setSpinner(false);
        }, 1000);
    };
    

    return (
        <div className='fixed top-0 left-0 bg-slate-400 w-full h-screen bg-opacity-40 z-20 flex items-center'>
            <div className='bg-white w-1/2 mx-auto rounded-md p-8 pb-4 px-10'>
                <div className='flex items-center justify-between mb-6'>
                    <h2 className='text-2xl font-medium'> Generate code </h2>
                    <button 
                        type="button" 
                        onClick={() => setGenerate(false)}
                        className="text-sky-500 hover:text-white border border-sky-500 hover:bg-sky-400 focus:ring-4 focus:outline-none focus:ring-sky-300 font-medium rounded-lg text-sm px-3.5 py-1.5 text-center"
                    >X</button>
                </div>
                
                <div className='px-10'>
                    <h4 className='text-lg font-medium mb-4'> Languages : </h4>
                    <ul className='flex flex-col space-y-1'>
                        {langs.map((item, key) => (
                            <button 
                                key={key} 
                                onClick={() => setLang(item)} 
                                className={`space-x-4 rounded-md py-2 h-16 items-center flex px-8 ${lang?.title === item?.title ? 'bg-sky-300 text-white' : 'hover:bg-black hover:bg-opacity-10'}`}
                            >
                                <div className='w-10 h-full flex items-center'>
                                    <img className='w-full h-fit object-contain' src={item.image} alt={`${item.title} icon`} />
                                </div>
                                <p>{item.title}</p>
                            </button>
                        ))}
                    </ul>
                </div>
                <div className='px-10 mt-10'>
                    <h4 className='text-lg font-medium mb-4'> File : </h4>
                    <ul className='flex flex-col space-y-1'>
                        {genres.map((item, key) => (
                            <button 
                                key={key} 
                                onClick={() => setFile(item)} 
                                className={`space-x-4 rounded-md py-2 h-16 items-center flex px-8 ${file?.title === item?.title ? 'bg-sky-300 text-white' : 'hover:bg-black hover:bg-opacity-10'}`}
                            >
                                <div className='w-10 h-full flex items-center'>
                                    <img className='w-full h-fit object-contain' src={item.image} alt={`${item.title} icon`} />
                                </div>
                                <p>{item.title}</p>
                            </button>
                        ))}
                    </ul>
                </div>

                <div className='flex justify-end space-x-2 mt-16'>
                    <button 
                        type="button" 
                        onClick={() => setGenerate(false)}
                        className="text-gray-900 bg-transparent border border-transparent focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
                    >Cancel</button>
                    <button 
                        type="button" 
                        disabled={!lang || !file} 
                        onClick={generateCode} 
                        className={`focus:outline-none space-x-3 flex items-center text-white ${(!lang || !file) ? " bg-gray-300" : "bg-sky-400 hover:bg-sky-500"}  focus:ring-4 focus:ring-bg-sky-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:focus:ring-bg-sky-900`}
                    >
                        
                        <p> Generate </p>

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
                </div>
            </div>
        </div>
    );
}

export default GenerateBox;
