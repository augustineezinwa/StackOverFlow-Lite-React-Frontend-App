import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactQuill from 'react-quill';
import Quill from 'quill';
import { compressAndUpload } from '../../utils/cloudinaryUpload';
import 'react-quill/dist/quill.snow.css';

/* Register align so toolbar alignment options work */
var AlignStyle = Quill.import('attributors/style/align');
Quill.register(AlignStyle, true);

const TOOLBAR_OPTIONS = [
  ['bold', 'italic', 'underline', 'strike'],
  [{ align: [] }],
  [{ list: 'ordered' }, { list: 'bullet' }],
  ['link', 'image']
];

class RichTextEditor extends Component {
  constructor(props) {
    super(props);
    this.quillRef = React.createRef();
    this.fileInputRef = React.createRef();
    this.handleImageClick = this.handleImageClick.bind(this);
    this.handleImageFile = this.handleImageFile.bind(this);
  }

  handleImageClick() {
    if (this.fileInputRef.current) this.fileInputRef.current.click();
  }

  handleImageFile(e) {
    const file = e.target.files && e.target.files[0];
    if (!file) return;
    e.target.value = '';
    const editor = this.quillRef.current && this.quillRef.current.getEditor && this.quillRef.current.getEditor();
    if (!editor) return;
    const range = editor.getSelection(true);
    if (!range) return;
    compressAndUpload(file)
      .then((url) => {
        editor.insertEmbed(range.index, 'image', url);
        editor.setSelection(range.index + 1, 0);
      })
      .catch(() => {});
  }

  getModules() {
    return {
      toolbar: {
        container: TOOLBAR_OPTIONS,
        handlers: {
          image: this.handleImageClick
        }
      }
    };
  }

  render() {
    const { value, placeholder, onChange, minHeight, disabled } = this.props;
    return (
      <div className="rich-editor-wrap" style={{ minHeight: minHeight || 140 }}>
        <input
          ref={this.fileInputRef}
          type="file"
          accept="image/*"
          onChange={this.handleImageFile}
          className="rich-editor-file-input"
          aria-hidden
        />
        <ReactQuill
          ref={this.quillRef}
          theme="snow"
          value={value || ''}
          placeholder={placeholder}
          onChange={onChange}
          modules={this.getModules()}
          readOnly={disabled}
          style={{ minHeight }}
          className="rich-editor-quill"
        />
      </div>
    );
  }
}

RichTextEditor.propTypes = {
  value: PropTypes.string,
  placeholder: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  minHeight: PropTypes.number,
  disabled: PropTypes.bool
};

RichTextEditor.defaultProps = {
  value: '',
  placeholder: '',
  minHeight: 140,
  disabled: false
};

export default RichTextEditor;
