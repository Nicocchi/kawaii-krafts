import { useCallback, useState } from 'react';

export default function useToggle(initValue = false) { 
    const [value, setValue] = useState(initValue);

    const toggle = useCallback(() => {
        setValue(v => !v);
    }, []);
    
    return [value, toggle];
}