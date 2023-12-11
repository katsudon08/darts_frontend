const TEXT = ({ text }: { text: string }) => {
    return (
        <h1 className="whitespace-nowrap select-none text-4xl font-semibold">{text}</h1>
    );
}

export default TEXT;