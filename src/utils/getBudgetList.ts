export const fetchUserInfo = async () => {
  const controller = new AbortController();
  const signal = controller.signal;

  try {
    const res = await fetch(`http://192.168.0.4:3004/`, { signal });
    
    if (!res.ok) {
      throw new Error(`${res.status} ${res.statusText}`);
    }

    const data = await res.json();
    return data
  } catch (error) {
    const err = error as Error
    if (err.name !== "AbortError") {
      throw err
    }
  }
};

