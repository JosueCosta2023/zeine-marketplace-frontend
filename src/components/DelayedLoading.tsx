import { useEffect, useRef, useState } from "react";

interface DelayedLoadingProps {
  delay?: number;
  minShow?: number;
  loading: boolean;
  children: React.ReactNode;
}

const DelayedLoading = ({
  delay = 400,
  minShow = 200,
  loading,
  children,
}: DelayedLoadingProps) => {
  const [show, setShow] = useState(false);
  const minShowTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const delayTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (loading) {
      delayTimeout.current = setTimeout(() => setShow(true), delay);
    } else {
      if (show) {
        minShowTimeout.current = setTimeout(() => setShow(false), minShow);
      } else {
        setShow(false);
      }
    }
    return () => {
      if (delayTimeout.current) clearTimeout(delayTimeout.current);
      if (minShowTimeout.current) clearTimeout(minShowTimeout.current);
    };
    // eslint-disable-next-line
  }, [loading, delay, minShow]);

  return show ? <>{children}</> : null;
};

export default DelayedLoading;