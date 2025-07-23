import { useState, useEffect, useRef } from 'react';
import Navbar from '../components/Navbar';
import axios from 'axios';

const Home = () => {
  const [input, setInput] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [output, setOutput] = useState(null);
  const [loading, setLoading] = useState(null);

  const fileInputRef = useRef(null);
  const [fileName, setFileName] = useState(null);

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if(!file) return;

    setFileName(file.name);
    setSelectedFile(file);
    const text = await file.text();
    setInput(text);
  }

  const handleValidate = async () => {
    let jsonData;

    try{
      jsonData = JSON.parse(input);
    } catch (err){
      alert('invalid json');
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(
        'https://hapi.fhir.org/baseR4/Patient/$validate',
        jsonData,
        {
          headers: {
            'Content-Type': 'application/fhir+json',
          },
        }
      )

      setOutput(response.data);
    } catch (err) {
      setOutput(err.response?.data || { issue: [{ details: { text: 'Validation failed or network error.' } }] });
    } finally {
      setLoading(false);
    }
  }

  const triggerFileInput = () => fileInputRef.current?.click();

  return (
    <div>
      <Navbar />
      <div className='flex flex-col mx-1 my-15'>
      <h1 className=''>Enter something effective</h1>
      <h2 className='ml-8 mt-6'>INPUT</h2>
      <textarea 
        value={input}
        onChange={(e) => setInput(e.target.value)}
        rows={10}
        placeholder='Enter >'
        className='resize-none h-[500px] border border-gray-400 p-6 mx-6 mb-6 mt-4 overflow-auto max-w-full whitespace-pre-wrap break-words text-sm
        focus:outline-none'
      />

      <div className='flex gap-3 mx-6'>
          <input 
            type="file"
            ref={fileInputRef}
            accept=""
            onChange={handleFileChange}
            className="hidden"
          />

        <button
          onClick={triggerFileInput}
          className={`p-2 border bg-green-500 text-white`}
          >
            Upload file
          </button>

        {fileName && (
          <div className='p-2'>
            [ ` {fileName} ` ]
          </div>
        )}

      </div>

      <div className='ml-6 mt-6'>
        <button 
          onClick={handleValidate}
          className='bg-blue-500 p-2 text-white w-fit'
          disabled={loading}
        >
          {loading ? "Validate..." : "validate >"}
        </button>
      </div>

      <h2 className='mt-6 ml-8'>OUTPUT</h2>
      <div>
        <div className='border border-gray-400 p-6 mx-6 mt-4 overflow-auto max-w-full whitespace-pre-wrap break-words text-sm'>
          {JSON.stringify(output, null, 2)}
        </div>
      </div>
    </div>
    </div>
    
  )
}

export default Home;