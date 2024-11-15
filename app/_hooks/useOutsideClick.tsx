import { useEffect, useRef } from "react";

export default function useOutsideClick(handler: () => void, listnerCapturing = true) {
    const ref = useRef<HTMLDivElement | null>(null);
    useEffect(() => {
        function handleClick(e: Event) {
            if (ref.current && !ref.current.contains(e.target as Node)) {
                handler();
            }
        }
        document.addEventListener("click", handleClick, listnerCapturing);
        return () =>
            document.removeEventListener("click", handleClick, listnerCapturing);
    }, [handler, listnerCapturing]);
    return ref;
}
