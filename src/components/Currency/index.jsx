export default function Currency({ label, value }) {
    return (
        <>
            {label && `${label}: `}
            <b
                style={{
                    color: value < 0 ? "red" : "green"
                }}
            >
                R$ {value}
            </b>
        </>
    )
}