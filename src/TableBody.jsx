export default function TableBody({ rows }) {
    return (
        <tbody>
            {rows.map((row, index) => (
                <tr key={index}>
                    {Object.values(row).map((entry, columnIndex) => (
                        <td key={columnIndex}>{entry}</td>
                    ))}
                </tr>
            ))}
        </tbody>
    );
}
