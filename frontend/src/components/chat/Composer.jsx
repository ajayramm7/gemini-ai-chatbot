import { forwardRef, useCallback, useRef, useState } from 'react';
import { FiFileText, FiImage, FiSend } from 'react-icons/fi';
import Button from '../ui/Button';

const Composer = forwardRef(function Composer({ onSend, onUpload, disabled }, ref) {
  const [value, setValue] = useState('');
  const [isDragging, setIsDragging] = useState(false);
  const documentInputRef = useRef(null);
  const imageInputRef = useRef(null);

  const submit = useCallback(() => {
    if (!value.trim() || disabled) return;
    onSend(value);
    setValue('');
  }, [disabled, onSend, value]);

  const handleFile = (file) => {
    if (!file) return;
    const isImage = file.type.startsWith('image/');
    onUpload(file, isImage ? 'image' : 'document');
  };

  return (
    <div
      onDragOver={(event) => {
        event.preventDefault();
        setIsDragging(true);
      }}
      onDragLeave={() => setIsDragging(false)}
      onDrop={(event) => {
        event.preventDefault();
        setIsDragging(false);
        handleFile(event.dataTransfer.files?.[0]);
      }}
      className={`border-t border-white/10 p-4 transition ${isDragging ? 'bg-cyan-300/10' : 'bg-white/[0.025]'}`}
    >
      <div className="mx-auto flex max-w-5xl items-end gap-3 rounded-[24px] border border-white/12 bg-white/8 p-2 shadow-lift backdrop-blur-xl">
        <input
          ref={documentInputRef}
          type="file"
          accept=".pdf,.txt,application/pdf,text/plain"
          className="hidden"
          onChange={(event) => handleFile(event.target.files?.[0])}
        />
        <input
          ref={imageInputRef}
          type="file"
          accept=".png,.jpg,.jpeg,image/png,image/jpeg"
          className="hidden"
          onChange={(event) => handleFile(event.target.files?.[0])}
        />

        <Button
          type="button"
          variant="ghost"
          title="Upload document"
          icon={FiFileText}
          className="h-12 w-12 shrink-0 rounded-2xl px-0"
          onClick={() => documentInputRef.current?.click()}
        />
        <Button
          type="button"
          variant="ghost"
          title="Upload image"
          icon={FiImage}
          className="h-12 w-12 shrink-0 rounded-2xl px-0"
          onClick={() => imageInputRef.current?.click()}
        />

        <textarea
          ref={ref}
          value={value}
          rows={1}
          placeholder="Ask Gemini anything..."
          onChange={(event) => setValue(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === 'Enter' && !event.shiftKey) {
              event.preventDefault();
              submit();
            }
          }}
          className="max-h-36 min-h-12 flex-1 resize-none bg-transparent px-1 py-3 text-sm text-white outline-none placeholder:text-white/36 md:text-base"
        />

        <Button
          type="button"
          variant="accent"
          title="Send message"
          icon={FiSend}
          className="h-12 w-12 shrink-0 rounded-2xl px-0"
          disabled={disabled || !value.trim()}
          onClick={submit}
        />
      </div>
    </div>
  );
});

export default Composer;
