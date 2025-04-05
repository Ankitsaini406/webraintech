'use client';

import { useRef } from 'react'
import store, { AppStore } from '@/store/store'
import { Provider } from 'react-redux';

export default function StoreProvider({ children }: { children: React.ReactNode }) {
    const storeRef = useRef<AppStore | null>(null)
    if (!storeRef.current) {
        storeRef.current = store()
    }

    return <Provider store={storeRef.current}>{children}</Provider>
}