export default function Spinner({ size = 16 }: { size?: number }) {
    return (
        <div
            className="animate-spin rounded-full border-3 border-t-red-900 border-r-red-100 border-b-red-900 border-l-red-900"
            style={{ width: size, height: size }}
        ></div>
    );
}
