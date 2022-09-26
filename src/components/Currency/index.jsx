export default function Currency({ label, value }) {
    return (
        <>
            {label}:{" "}
            <b
                style={{
                    color: value < 0 ? "red" : "lightgreen"
                }}
            >
                R$ {value}
            </b>
        </>
    )
}