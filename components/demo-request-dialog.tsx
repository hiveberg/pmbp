'use client';

import { useState, type ReactNode } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { DemoRequestForm } from './demo-request-form';

type DemoRequestDialogProps = {
  children: ReactNode;
  className?: string;
};

export function DemoRequestDialog({
  children,
  className,
}: DemoRequestDialogProps) {
  const [open, setOpen] = useState(false);

  function openDemo() {
    if (window.matchMedia('(max-width: 767px)').matches) {
      window.location.assign('/demo');
      return;
    }
    setOpen(true);
  }

  return (
    <>
      <button type="button" className={className} onClick={openDemo}>
        {children}
      </button>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="demo-dialog sm:max-w-[540px]">
          <DialogHeader>
            <p className="eyebrow">Wersja demonstracyjna</p>
            <DialogTitle className="demo-dialog-title">
              Zobacz PMBP w działaniu
            </DialogTitle>
            <DialogDescription className="demo-dialog-description">
              Zostaw dane kontaktowe. Zweryfikujemy zgłoszenie i prześlemy link
              do wersji demonstracyjnej.
            </DialogDescription>
          </DialogHeader>
          <DemoRequestForm compact onComplete={() => setOpen(false)} />
        </DialogContent>
      </Dialog>
    </>
  );
}
