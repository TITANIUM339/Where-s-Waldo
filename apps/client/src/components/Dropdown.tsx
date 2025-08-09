import { useLayoutEffect, useRef, useState, type ReactNode } from "react";

export default function Dropdown({
    position,
    targetRect,
    children,
}: {
    position: { clientX: number; clientY: number };
    targetRect: DOMRect;
    children: ReactNode;
}) {
    const ref = useRef<HTMLDivElement>(null);

    const [dropdownSize, setDropdownSize] = useState({ width: 0, height: 0 });

    // Measure size before browser paint then rerender with correct size
    useLayoutEffect(() => {
        const rect = ref.current?.getBoundingClientRect();

        if (rect?.width && rect?.height) {
            const { width, height } = rect;

            setDropdownSize({ width, height });
        }
    }, []);

    // Calculate pointer offset relative to the parent container (targetRect)
    // The reason why this is used instead of regular offset is because when a user clicks on the dropdown the offset becomes now relative to the dropdown instead of the container
    const pointerX = position.clientX - targetRect.left;
    const pointerY = position.clientY - targetRect.top;

    const right =
        targetRect.right > window.innerWidth
            ? window.innerWidth
            : targetRect.right;
    const bottom =
        targetRect.bottom > window.innerHeight
            ? window.innerHeight
            : targetRect.bottom;

    // If the dropdown can't fit on the right side of the pointer set it to the left side
    const dropdownX =
        dropdownSize.width >= right - position.clientX
            ? pointerX - dropdownSize.width
            : pointerX;
    // If the dropdown can't fit on the bottom side of the pointer set it to the top side
    const dropdownY =
        dropdownSize.height >= bottom - position.clientY
            ? pointerY - dropdownSize.height
            : pointerY;

    return (
        <>
            <div
                className="pointer-events-none absolute z-10 h-10 w-10 translate-[-50%] rounded-full bg-gray-100/60 dark:bg-gray-900/60"
                style={{ left: pointerX, top: pointerY }}
            ></div>
            <div
                ref={ref}
                className="absolute z-10 w-max rounded-md bg-gray-100 p-2 shadow-lg dark:bg-gray-900"
                style={{ left: dropdownX, top: dropdownY }}
            >
                {children}
            </div>
        </>
    );
}
