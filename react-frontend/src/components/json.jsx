import { useState } from "react";

export default function JSONComponent() {
    const [file, setFile] = useState(null);
    const [jsonContent, setJsonContent] = useState({ "name": "John", "age": 30, "city": "New York" }); // JSON data to download

    const downloadJsonFile = () => {
        // Step 1: Convert the JavaScript object to a JSON string
        const jsonString = JSON.stringify(jsonContent, null, 2); // Pretty-print with 2 spaces indentation

        // Step 2: Create a Blob with the JSON string
        const blob = new Blob([jsonString], { type: 'application/json' });

        // Step 3: Create a download link for the JSON file
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob); // Create a URL for the Blob
        link.download = 'data.json'; // Set the filename for the downloaded file

        // Step 4: Trigger the download
        link.click();
    };

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0]; // Get the first file selected
        if (selectedFile) {
            setFile(selectedFile); // Set the file to state
            handleFileUpload(selectedFile); // Automatically upload the file
        }
    };

    const handleFileUpload = (selectedFile) => {
        const reader = new FileReader();
        reader.onload = () => {
            try {
                // Parse the file content as JSON
                const parsedData = JSON.parse(reader.result);
                setJsonContent(parsedData); // Store the parsed JSON data
            } catch (error) {
                console.error('Error parsing JSON:', error);
                alert('Invalid JSON file.');
            }
        };
        if (selectedFile) {
            reader.readAsText(selectedFile); // Read the file as text
        } else {
            alert('No file selected.');
        }
    };

    return (
        <div>
            <h1>JSON Component</h1>
            <pre>{JSON.stringify(jsonContent, null, 2)}</pre>
            <input type="file" onChange={handleFileChange} />
            <button onClick={downloadJsonFile}>Download JSON File</button>
        </div>
    );
}
