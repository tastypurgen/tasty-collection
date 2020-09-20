import React, { useRef, useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useIntl } from 'react-intl';

import './ImageUpload.scss';

export default function ImageUploader({ center, id, onInput }) {
  const [currentFile, setCurrentFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [isValid, setIsValid] = useState(false);

  const intl = useIntl().formatMessage;
  const filePickerElement = useRef();

  useEffect(() => {
    if (!currentFile) return;
    const fileReader = new FileReader();
    fileReader.onload = () => setPreviewUrl(fileReader.result);
    fileReader.readAsDataURL(currentFile);
  }, [currentFile]);

  const pickImageHandler = () => {
    filePickerElement.current.click();
  };

  const pickHandler = (event) => {
    let pickedFile;
    let fileIsValid = isValid;
    if (event.target.files && event.target.files.length === 1) {
      // eslint-disable-next-line prefer-destructuring
      pickedFile = event.target.files[0];
      setCurrentFile(pickedFile);
      setIsValid(true);
      fileIsValid = true;
    } else {
      setIsValid(false);
      fileIsValid = false;
    }
    onInput(id, pickedFile, fileIsValid);
  };

  return (
    <Form.Group>
      <input
        id={id}
        ref={filePickerElement}
        style={{ display: 'none' }}
        type="file"
        accept=".jpg,.png,.jpeg"
        onChange={pickHandler}
      />
      <div className={`image-upload ${center && 'center'}`}>
        <div className="image-upload__preview">
          {previewUrl
            ? <img src={previewUrl} alt="Preview" />
            : <p>{intl({ id: 'ImageUploader.ChooseAnImage' })}</p>}
        </div>
        <Button type="button" variant="secondary" onClick={pickImageHandler}>{intl({ id: 'ImageUploader.ChooseImage' })}</Button>
      </div>
    </Form.Group>
  );
}
