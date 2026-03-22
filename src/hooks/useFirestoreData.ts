import { useState, useEffect } from "react";

export function useFirestoreData<T>(fetcher: () => Promise<T | null>, fallback: T): { data: T; loading: boolean } {
  const [data, setData] = useState<T>(fallback);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    fetcher()
      .then((result) => {
        if (!cancelled && result) setData(result);
      })
      .catch(console.error)
      .finally(() => { if (!cancelled) setLoading(false); });
    return () => { cancelled = true; };
  }, []);

  return { data, loading };
}

export function useFirestoreList<T>(fetcher: () => Promise<T[]>, fallback: T[]): { data: T[]; loading: boolean; refresh: () => void } {
  const [data, setData] = useState<T[]>(fallback);
  const [loading, setLoading] = useState(true);
  const [trigger, setTrigger] = useState(0);

  const refresh = () => setTrigger((t) => t + 1);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    fetcher()
      .then((result) => {
        if (!cancelled && result.length > 0) setData(result);
      })
      .catch(console.error)
      .finally(() => { if (!cancelled) setLoading(false); });
    return () => { cancelled = true; };
  }, [trigger]);

  return { data, loading, refresh };
}
