import { formatFileSize } from '../../utils/formatFileSize.js';

export default function InMemoryFileAttachments({ files, onChange }) {
  function handleFilesSelected(event) {
    const selected = Array.from(event.target.files ?? []);
    if (selected.length > 0) {
      onChange([...files, ...selected]);
    }
    event.target.value = '';
  }

  function removeFile(indexToRemove) {
    onChange(files.filter((_, index) => index !== indexToRemove));
  }

  return (
    <div className="file-attachments">
      <label className="form-field" htmlFor="custom-attachments">
        <span>Supporting files, if useful</span>
        <input id="custom-attachments" type="file" multiple onChange={handleFilesSelected} />
      </label>
      <p className="form-help">Selected files stay on this page; nothing is uploaded.</p>
      {files.length > 0 && (
        <ul className="selected-files" aria-label="Selected supporting files">
          {files.map((file, index) => (
            <li key={`${file.name}-${file.lastModified}-${index}`}>
              <span className="selected-file-details">
                <strong>{file.name}</strong>
                <span>{formatFileSize(file.size)}</span>
              </span>
              <button type="button" className="text-button" onClick={() => removeFile(index)} aria-label={`Remove ${file.name}`}>
                Remove
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
