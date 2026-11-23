import { createContext, useCallback, useContext, useEffect, useRef, useState, type ReactNode } from 'react';
import { Icon } from '../components/Icons';

type Push = (message: string) => void;

const Ctx = createContext<Push>(() => {});

export const useToast = (): Push => useContext(Ctx);

export const ToastProvider = ({ children }: { children: ReactNode }) => {
  const [message, setMessage] = useState<string | null>(null);
  const timer = useRef<number | undefined>(undefined);

  const push = useCallback<Push>((msg) => {
    setMessage(msg);
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setMessage(null), 2400);
  }, []);

  useEffect(() => () => window.clearTimeout(timer.current), []);

  return (
    <Ctx.Provider value={push}>
      {children}
      <div className="toast-host" role="status" aria-live="polite">
        {message ? (
          <div className="toast">
            <Icon name="check" size={15} />
            {message}
          </div>
        ) : null}
      </div>
    </Ctx.Provider>
  );
};
