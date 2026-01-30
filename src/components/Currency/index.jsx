const variantClasses = {
    auto: (value) => value < 0 ? 'text-red-600' : 'text-green-600',
    success: () => 'text-green-700',
    danger: () => 'text-red-700',
    primary: () => 'text-blue-700',
    neutral: () => 'text-gray-700',
}

export default function Currency({ label, value, variant = 'auto' }) {
    const formattedValue = new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
    }).format(value)

    const colorClass = variantClasses[variant]?.(value) || variantClasses.auto(value)

    return (
        <span className="inline-flex items-center gap-1">
            {label && <span className="text-gray-600">{label}:</span>}
            <span className={`font-semibold ${colorClass}`}>
                {formattedValue}
            </span>
        </span>
    )
}