export default function TableBody({ openTableModal, rows }) {
    return (
        <tbody>
            {rows.map((row, index) => {
                let rowCopy = Object.assign({}, row);
                delete rowCopy.id;
                return (
                    <tr key={index} onClick={() => openTableModal(row.id)}>
                        {Object.values(rowCopy).map((entry, columnIndex) => (
                            <td key={columnIndex}>{entry}</td>
                        ))}
                    </tr>
                );
            })}
        </tbody>
    );
}
