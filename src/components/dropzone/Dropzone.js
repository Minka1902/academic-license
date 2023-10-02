import React from 'react';
import CurrentDataContext from '../../contexts/CurrentDataContext';
import { useDropzone } from 'react-dropzone';

export default function Dropzone({ }) {
    const { getRootProps, getInputProps, open, acceptedFiles } = useDropzone({
        // Disable click and keydown behavior
        noClick: true,
        noKeyboard: true
    });
    const { setData } = React.useContext(CurrentDataContext);
    const [files, setFiles] = React.useState(null);

    const handleFileChange = (file) => {
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                const fileContents = event.target.result;
                if (fileContents) {
                    const lines = fileContents.split('\r\n');
                    if (lines) {
                        let data = [];
                        for (let index = 0; index < lines.length; index++) {
                            let props = lines[index].split('\t');
                            if (props[0] !== '' && props[1] !== '') {
                                if (props[3] !== '') {
                                    data[data.length] = { name: `${props[0]} ${props[1]}`, email: props[2], key: props[3] };
                                } else {
                                    data[data.length] = { name: props[0], email: props[1], key: props[2] };
                                }
                            }
                        }
                        setData(data);
                    }
                }
            };

            reader.readAsText(file);
        }
    };

    React.useEffect(() => {
        const asd = acceptedFiles.map((file) => {
            handleFileChange(file);
            return (<p key={file.path}>{file.path} - {file.size} bytes</p>);
        });
        setFiles(asd);
    }, [acceptedFiles])

    return (
        <div className="container">
            <div {...getRootProps({ className: 'dropzone' })}>
                <input {...getInputProps()} onChange={handleFileChange} />
                <p>Drag 'n' drop your file here</p>
                <button type="button" onClick={open}>
                    {files === null || files.length === 0 ? 'Open File Dialog' : 'Switch file'}
                </button>
                {files}
            </div>
        </div>
    );
};
