import { useEffect, RefObject } from 'react';

type UseClickCloseProps = {
	isOpen: boolean;
	onClose: () => void;
	rootRef: RefObject<HTMLElement>;
};

export function useClickClose({
	isOpen,
	onClose,
	rootRef,
}: UseClickCloseProps) {
	useEffect(() => {
		if (!isOpen) return;

		const handleClickOutside = (event: MouseEvent) => {
			if (rootRef.current && !rootRef.current.contains(event.target as Node)) {
				onClose();
			}
		};

		const handleEscape = (event: KeyboardEvent) => {
			if (event.key === 'Escape') {
				onClose();
			}
		};

		document.addEventListener('mouseup', handleClickOutside);
		document.addEventListener('keydown', handleEscape);

		return () => {
			document.removeEventListener('mouseup', handleClickOutside);
			document.removeEventListener('keydown', handleEscape);
		};
	}, [isOpen, onClose, rootRef]);
}
