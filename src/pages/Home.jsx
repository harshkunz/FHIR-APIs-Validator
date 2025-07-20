import { useState, useEffect } from 'react';
import axios from 'axios';

const Home = () => {
  const [input, setInput] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [output, setOutput] = useState(null);
  const [loading, setLoading] = useState(null);

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if(!file) return;

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

  return (
    <div className='flex flex-col p-4'>
      <h1 className=''>Fhir Api's Validator</h1>
      <h2>input</h2>
      <textarea 
        value={input}
        onChange={(e) => setInput(e.target.value)}
        rows={10}
        className='bg-gray-300 m-4'
      />

      <input 
        type="file"
        accept=".json"
        onChange={handleFileChange}
        className="mb-4"
      />

      <button 
        onClick={handleValidate}
        className='bg-blue-500 text-white w-1/2'
        disabled={loading}
      >
        {loading ? "Validate..." : "validate file"}
      </button>

      <h2 className='m-2'>output</h2>
      <div>
        <pre>
          {JSON.stringify(output, null, 2)}
        </pre>
      </div>
    </div>
  )
}

export default Home;