'use client';

import { useEffect } from 'react';

import { useStoreModal } from '@/hooks/use-store-modal';

export default function SetupPage() {
  const onOpen = useStoreModal(s => s.onOpen);
  const isOpen = useStoreModal(s => s.isOpen);

  useEffect(() => {
    if (!isOpen) {
      onOpen();
    }
  }, [isOpen, onOpen]);

  return (
    <div>
      <p>Setup page</p>
    </div>
  );
}
