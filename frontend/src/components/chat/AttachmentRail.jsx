import { useState } from 'react';
import {
  FiBookOpen,
  FiChevronDown,
  FiChevronUp,
  FiCheckCircle,
  FiFileText,
  FiImage,
  FiMaximize2,
  FiMinimize2,
  FiX
} from 'react-icons/fi';
import { formatFileSize } from '../../utils/formatters';

export default function AttachmentRail({ document, image, uploadProgress }) {
  const [isDocumentExpanded, setIsDocumentExpanded] = useState(false);
  const [isDocumentOpen, setIsDocumentOpen] = useState(false);
  const [isImageOpen, setIsImageOpen] = useState(false);
  const imagePreview = image?.preview || (image?.base64 ? `data:${image.mimeType};base64,${image.base64}` : null);
  const canPreviewPdf = document?.localPreviewUrl && document?.localPreviewType === 'pdf';

  if (!document && !image && !uploadProgress) return null;

  return (
    <div className="border-t border-white/10 bg-white/[0.035] px-4 py-3">
      {uploadProgress ? (
        <div className="mb-3 h-1.5 overflow-hidden rounded-full bg-white/10">
          <div className="h-full rounded-full bg-cyan-300 transition-all" style={{ width: `${uploadProgress}%` }} />
        </div>
      ) : null}
      <div className="grid gap-3 xl:grid-cols-2">
        {document ? (
          <article className="overflow-hidden rounded-2xl border border-cyan-200/18 bg-gradient-to-br from-white/10 to-white/[0.035] shadow-lift">
            <div className="flex items-start gap-3 p-4">
              <div className="relative flex h-14 w-12 shrink-0 items-center justify-center rounded-xl border border-cyan-200/25 bg-cyan-200/12 text-cyan-100">
                <FiFileText className="h-5 w-5" />
                <span className="absolute -bottom-1 rounded-md bg-cyan-200 px-1.5 py-0.5 text-[9px] font-extrabold text-ink">
                  {document.mimeType?.includes('pdf') ? 'PDF' : 'TXT'}
                </span>
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <p className="truncate text-sm font-bold text-white md:text-base">{document.fileName}</p>
                  <span className="inline-flex items-center gap-1 rounded-full border border-mint/25 bg-mint/10 px-2 py-0.5 text-[11px] font-semibold text-mint">
                    <FiCheckCircle className="h-3 w-3" /> Ready
                  </span>
                </div>
                <div className="mt-1 flex flex-wrap gap-2 text-xs text-white/48">
                  <span>{formatFileSize(document.size)}</span>
                  <span>{document.characterCount?.toLocaleString() || 0} characters</span>
                  <span>{document.mimeType?.includes('pdf') ? 'PDF' : 'Text document'}</span>
                </div>
                <div className="mt-3 flex flex-wrap gap-2">
                  <span className="inline-flex items-center gap-1 rounded-full border border-white/10 bg-white/7 px-2.5 py-1 text-[11px] font-medium text-white/58">
                    <FiBookOpen className="h-3 w-3" /> Context source
                  </span>
                  <span className="inline-flex items-center rounded-full border border-white/10 bg-white/7 px-2.5 py-1 text-[11px] font-medium text-white/58">
                    Stored in memory
                  </span>
                </div>
              </div>
              {document.preview ? (
                <button
                  type="button"
                  onClick={() => setIsDocumentExpanded((current) => !current)}
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/7 text-white/70 transition hover:bg-white/12 hover:text-white"
                  title={isDocumentExpanded ? 'Collapse document preview' : 'Expand document preview'}
                >
                  {isDocumentExpanded ? <FiChevronUp /> : <FiChevronDown />}
                </button>
              ) : null}
            </div>

            {canPreviewPdf ? (
              <div className="border-t border-white/10 bg-black/10 px-4 py-3">
                <button
                  type="button"
                  onClick={() => setIsDocumentOpen(true)}
                  className="group flex w-full items-center gap-3 overflow-hidden rounded-2xl border border-white/10 bg-ink/50 p-3 text-left transition hover:border-cyan-200/35 hover:bg-white/8"
                >
                  <div className="relative h-24 w-20 shrink-0 overflow-hidden rounded-xl border border-white/10 bg-white">
                    <iframe
                      src={`${document.localPreviewUrl}#page=1&toolbar=0&navpanes=0&scrollbar=0`}
                      title={`${document.fileName} preview thumbnail`}
                      className="pointer-events-none h-48 w-40 origin-top-left scale-50 border-0"
                    />
                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent p-1 text-center text-[9px] font-bold text-white">
                      PDF
                    </div>
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-bold text-white">Preview PDF</p>
                    <p className="mt-1 text-xs leading-5 text-white/52">
                      Open the uploaded PDF in a focused reader without leaving the chat.
                    </p>
                    <span className="mt-3 inline-flex items-center gap-1 rounded-full bg-cyan-200 px-2.5 py-1 text-[11px] font-bold text-ink">
                      Open preview <FiMaximize2 className="h-3 w-3" />
                    </span>
                  </div>
                </button>
              </div>
            ) : null}

            {document.preview ? (
              <div className="border-t border-white/10 bg-black/15 px-4 py-3">
                <div className="mb-2 flex items-center justify-between text-[11px] font-semibold uppercase tracking-[0.16em] text-white/36">
                  <span>Extracted Preview</span>
                  <button
                    type="button"
                    onClick={() => setIsDocumentExpanded((current) => !current)}
                    className="rounded-full px-2 py-1 normal-case tracking-normal text-cyan-100 transition hover:bg-white/10"
                  >
                    {isDocumentExpanded ? 'Show less' : 'Read more'}
                  </button>
                </div>
                <div className={`relative rounded-xl border border-white/8 bg-ink/60 ${isDocumentExpanded ? 'max-h-72 overflow-y-auto' : 'max-h-28 overflow-hidden'}`}>
                  <pre className="whitespace-pre-wrap p-3 text-xs leading-5 text-white/70">{document.preview}</pre>
                  {!isDocumentExpanded ? (
                    <div className="pointer-events-none absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-ink to-transparent" />
                  ) : null}
                </div>
              </div>
            ) : null}
          </article>
        ) : null}

        {image ? (
          <article className="overflow-hidden rounded-2xl border border-cyan-200/18 bg-gradient-to-br from-white/10 to-white/[0.035] shadow-lift">
            <div className="flex gap-4 p-4">
              {imagePreview ? (
                <button
                  type="button"
                  onClick={() => setIsImageOpen(true)}
                  className="group relative h-28 w-28 shrink-0 overflow-hidden rounded-2xl border border-white/10 shadow-lift"
                  title="Open image preview"
                >
                  <img
                    src={imagePreview}
                    alt={image.fileName}
                    className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                  />
                  <span className="absolute inset-0 flex items-center justify-center bg-black/0 text-white opacity-0 transition group-hover:bg-black/35 group-hover:opacity-100">
                    <FiMaximize2 className="h-5 w-5" />
                  </span>
                </button>
              ) : (
                <div className="flex h-28 w-28 shrink-0 items-center justify-center rounded-2xl border border-cyan-200/25 bg-cyan-200/12 text-cyan-100">
                  <FiImage className="h-6 w-6" />
                </div>
              )}
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <p className="truncate text-sm font-bold text-white md:text-base">{image.fileName}</p>
                  <span className="inline-flex items-center gap-1 rounded-full border border-mint/25 bg-mint/10 px-2 py-0.5 text-[11px] font-semibold text-mint">
                    <FiCheckCircle className="h-3 w-3" /> Ready
                  </span>
                </div>
                <div className="mt-1 flex flex-wrap gap-2 text-xs text-white/48">
                  <span>{formatFileSize(image.size)}</span>
                  <span>{image.mimeType?.replace('image/', '').toUpperCase()}</span>
                  <span>Vision context active</span>
                </div>
                <div className="mt-3 grid gap-2 sm:grid-cols-2">
                  <div className="rounded-xl border border-white/8 bg-black/15 p-3">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-white/32">Mode</p>
                    <p className="mt-1 text-xs text-white/64">Gemini vision input</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setIsImageOpen(true)}
                    className="rounded-xl border border-white/8 bg-white/7 p-3 text-left transition hover:bg-white/12"
                  >
                    <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-white/32">Preview</p>
                    <p className="mt-1 inline-flex items-center gap-1 text-xs text-cyan-100">
                      Open image <FiMaximize2 className="h-3 w-3" />
                    </p>
                  </button>
                </div>
              </div>
            </div>
          </article>
        ) : null}
      </div>

      {isImageOpen && imagePreview ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/72 p-4 backdrop-blur-md" onClick={() => setIsImageOpen(false)}>
          <div className="relative max-h-[88vh] w-full max-w-4xl overflow-hidden rounded-3xl border border-white/14 bg-ink shadow-glass" onClick={(event) => event.stopPropagation()}>
            <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
              <div className="min-w-0">
                <p className="truncate text-sm font-bold text-white">{image.fileName}</p>
                <p className="text-xs text-white/45">{formatFileSize(image.size)} · {image.mimeType}</p>
              </div>
              <button
                type="button"
                onClick={() => setIsImageOpen(false)}
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/7 text-white/70 transition hover:bg-white/12 hover:text-white"
                title="Close image preview"
              >
                <FiX />
              </button>
            </div>
            <div className="flex max-h-[76vh] items-center justify-center bg-black/25 p-4">
              <img src={imagePreview} alt={image.fileName} className="max-h-[72vh] max-w-full rounded-2xl object-contain" />
            </div>
          </div>
        </div>
      ) : null}

      {isDocumentOpen && canPreviewPdf ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/72 p-4 backdrop-blur-md" onClick={() => setIsDocumentOpen(false)}>
          <div className="relative flex h-[90vh] w-full max-w-6xl flex-col overflow-hidden rounded-3xl border border-white/14 bg-ink shadow-glass" onClick={(event) => event.stopPropagation()}>
            <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
              <div className="min-w-0">
                <p className="truncate text-sm font-bold text-white">{document.fileName}</p>
                <p className="text-xs text-white/45">{formatFileSize(document.size)} · PDF preview</p>
              </div>
              <button
                type="button"
                onClick={() => setIsDocumentOpen(false)}
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/7 text-white/70 transition hover:bg-white/12 hover:text-white"
                title="Close PDF preview"
              >
                <FiMinimize2 />
              </button>
            </div>
            <iframe
              src={`${document.localPreviewUrl}#toolbar=1&navpanes=0`}
              title={`${document.fileName} PDF preview`}
              className="min-h-0 flex-1 border-0 bg-white"
            />
            <button
              type="button"
              onClick={() => setIsDocumentOpen(false)}
              className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-ink/90 text-white/70 transition hover:bg-white/12 hover:text-white"
              title="Close PDF preview"
            >
              <FiX />
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}
