import React from 'react';

interface ConfirmDeleteAllModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  count: number;
  isDeleting: boolean;
}

const ConfirmDeleteAllModal: React.FC<ConfirmDeleteAllModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  count,
  isDeleting
}) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-[#1B4332]/80 backdrop-blur-sm"
      onClick={isDeleting ? undefined : onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="confirm-delete-all-title"
    >
      <div
        className="bg-white rounded-[2rem] sm:rounded-[3rem] w-full max-w-md shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6 sm:p-8">
          <div className="w-14 h-14 rounded-2xl bg-red-100 flex items-center justify-center mx-auto mb-5">
            <svg className="w-7 h-7 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </div>
          <h3 id="confirm-delete-all-title" className="text-xl sm:text-2xl font-black text-[#1B4332] text-center mb-2">
            Excluir todos os cadastros?
          </h3>
          <p className="text-sm text-gray-500 text-center mb-6">
            Serão removidos <strong className="text-[#1B4332]">{count}</strong> colaborador{count !== 1 ? 'es' : ''} do sistema. Esta ação não pode ser desfeita.
          </p>
          <div className="flex gap-3">
            <button
              type="button"
              onClick={onClose}
              disabled={isDeleting}
              className="flex-1 py-3.5 rounded-2xl font-bold text-[#1B4332] bg-[#F4F1DE] hover:bg-[#E8E4D8] transition-colors disabled:opacity-50"
            >
              Cancelar
            </button>
            <button
              type="button"
              onClick={onConfirm}
              disabled={isDeleting}
              className="flex-1 py-3.5 rounded-2xl font-bold text-white bg-red-500 hover:bg-red-600 transition-colors disabled:opacity-70 flex items-center justify-center gap-2"
            >
              {isDeleting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Excluindo…
                </>
              ) : (
                'Excluir todos'
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDeleteAllModal;
