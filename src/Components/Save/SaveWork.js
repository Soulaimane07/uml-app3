import React, { useState } from 'react'
// import { Dropbox } from 'dropbox';
// import { gapi } from 'gapi-script';


function SaveWork({dataToSave, disabled, setSave, nodes}) {
  const options = [
    {
        "title": "Local",
        "image": "../images/hard-drive.png",
        "api": "",
        "function": ()=> exportJSON(nodes)
    },
    {
      "title": "Google Drive",
      "image": "../images/google-drive.png",
      "api": ""
    },
    {
      "title": "DropBox",
      "image": "../images/dropbox.png",
      "api": ""
    }
  ]

 // Google Drive Configuration
 const GOOGLE_CLIENT_ID = 'YOUR_GOOGLE_CLIENT_ID';
 const SCOPES = 'https://www.googleapis.com/auth/drive.file';

 // Dropbox Configuration
 const DROPBOX_ACCESS_TOKEN = 'YOUR_DROPBOX_ACCESS_TOKEN';

 // Authenticate and Save to Google Drive
 const saveToGoogleDrive = async () => {
//    gapi.load('client:auth2', async () => {
//      await gapi.client.init({
//        apiKey: 'YOUR_GOOGLE_API_KEY',
//        clientId: GOOGLE_CLIENT_ID,
//        discoveryDocs: ['https://www.googleapis.com/discovery/v1/apis/drive/v3/rest'],
//        scope: SCOPES,
//      });

//      const authInstance = gapi.auth2.getAuthInstance();
//      await authInstance.signIn();

//      const fileContent = JSON.stringify(dataToSave);
//      const file = new Blob([fileContent], { type: 'application/json' });
//      const metadata = {
//        name: 'diagram.json',
//        mimeType: 'application/json',
//      };

//      const form = new FormData();
//      form.append('metadata', new Blob([JSON.stringify(metadata)], { type: 'application/json' }));
//      form.append('file', file);

//      const response = await fetch('https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart', {
//        method: 'POST',
//        headers: {
//          Authorization: `Bearer ${gapi.auth.getToken().access_token}`,
//        },
//        body: form,
//      });

//      if (response.ok) {
//        alert('Saved to Google Drive!');
//      } else {
//        alert('Failed to save to Google Drive');
//      }
//    });
 };

 // Save to Dropbox
 const saveToDropbox = async () => {
//    const dbx = new Dropbox({ accessToken: DROPBOX_ACCESS_TOKEN });
//    const fileContent = JSON.stringify(dataToSave);

//    try {
//      await dbx.filesUpload({
//        path: '/diagram.json',
//        contents: fileContent,
//        mode: 'overwrite',
//      });
//      alert('Saved to Dropbox!');
//    } catch (error) {
//      console.error(error);
//      alert('Failed to save to Dropbox');
//    }
 };

    const exportJSON = (nodes) => {
        const jsonString = JSON.stringify(nodes, null, 2);
        const blob = new Blob([jsonString], { type: "application/json" });
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = "work.json";
        link.click();
        URL.revokeObjectURL(link.href);
    };

 return (
  <div className='fixed top-0 left-0 bg-slate-400 w-full h-screen bg-opacity-40 z-20 flex items-center'>
            <div className='bg-white w-1/2 mx-auto rounded-md p-8 pb-4 px-10'>
                <div className='flex items-center justify-between mb-6'>
                    <h2 className='text-2xl font-medium'> Save your work </h2>
                    <button 
                        type="button" 
                        onClick={() => setSave(false)}
                        className="text-sky-500 hover:text-white border border-sky-500 hover:bg-sky-400 focus:ring-4 focus:outline-none focus:ring-sky-300 font-medium rounded-lg text-sm px-3.5 py-1.5 text-center"
                    >X</button>
                </div>
                
                <div className='px-10 pb-10'>
                    <ul className='flex flex-col space-y-1'>
                        {options.map((item, key) => (
                            <button 
                                key={key} 
                                onClick={item.function} 
                                className={`space-x-4 rounded-md py-2 h-16 items-center flex px-8 hover:bg-black hover:bg-opacity-10`}
                            >
                                <div className='w-10 h-full flex items-center'>
                                    <img className='w-full h-fit object-contain' src={item.image} alt={`${item.title} icon`} />
                                </div>
                                <p>{item.title}</p>
                            </button>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
   
 );
};

export default SaveWork




{/* <div className="flex gap-4">
     <button disabled={disabled} onClick={saveToGoogleDrive} className="bg-blue-500 text-white px-4 py-2 rounded">
       Save to Google Drive
     </button>
     <button disabled={disabled} onClick={saveToDropbox} className="bg-green-500 text-white px-4 py-2 rounded">
       Save to Dropbox
     </button>
   </div> */}