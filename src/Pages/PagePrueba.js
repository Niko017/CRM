import React, { useState } from 'react';
import Quill from 'quill';
import ReactQuill from 'react-quill';
import ImageResize from 'quill-image-resize-module-react';
import { ImageDrop } from 'quill-image-drop-module';
import 'react-quill/dist/quill.snow.css';

// Registrar los módulos antes de renderizar el componente.
Quill.register('modules/imageResize', ImageResize);
Quill.register('modules/imageDrop', ImageDrop);

// Registrar los módulos fuera del componente
const modules = {
  toolbar: [
    ['bold', 'italic', 'underline', 'strike'],
    ['blockquote', 'code-block'],
    [{ 'header': 1 }, { 'header': 2 }],
    [{ 'list': 'ordered'}, { 'list': 'bullet' }],
    [{ 'script': 'sub'}, { 'script': 'super' }],
    [{ 'indent': '-1'}, { 'indent': '+1' }],
    [{ 'direction': 'ltr' }],
    [{ 'size': ['small', false, 'large', 'huge'] }],
    [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
    [{ 'color': [] }, { 'background': [] }],
    [{ 'font': [] }],
    [{ 'align': [] }],
    ['link', 'image'],
    ['clean']
  ],
  imageResize: {
    parchment: Quill.import('parchment'),
    modules: [ 'Resize', 'DisplaySize', 'Toolbar' ],
    handleStyles: {
      backgroundColor: 'black',
      border: 'none',
      color: '#4040ff'
    },
    displayStyles: {
      backgroundColor: 'black',
      border: 'none',
      color: '#FFF'
    },
    toolbarStyles: {
      backgroundColor: 'black',
      border: 'none',
      color: '#FFF'
    },
  },
  imageDrop: true,
};

function PagePrueba() {
  const [value, setValue] = useState('');

  return (
    <React.Fragment>
      <ReactQuill theme="snow" value={value} onChange={setValue} modules={modules} />
    </React.Fragment>
  );
} export default PagePrueba;