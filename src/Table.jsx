export default function Table({ rows }) {
    return rows[0] ? (
        <table>
            <thead>
                <tr>
                    {Object.keys(rows[0]).map((entry, index) => (
                        <th key={index}>{entry.charAt(0).toUpperCase() + entry.slice(1)}</th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {rows.map((row, index) => (
                    <tr key={index}>
                        {Object.values(row).map((entry, columnIndex) => (
                            <td key={columnIndex}>{entry}</td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    ) : null;
}
