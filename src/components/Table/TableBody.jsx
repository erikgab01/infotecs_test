/**
 * @param {function} openTableModal - фунция для открытия модального окна с информацией о строке таблицы
 * @param {object[]} rows - строки таблицы
 */
export default function TableBody({ openTableModal, rows }) {
    return (
        <tbody className="table__body">
            {rows.map((row, index) => {
                let rowCopy = Object.assign({}, row);
                delete rowCopy.id;
                return (
                    <tr className="table__row" key={index} onClick={() => openTableModal(row.id)}>
                        {Object.values(rowCopy).map((entry, columnIndex) => (
                            <td className="table__cell" key={columnIndex}>
                                {entry}
                            </td>
                        ))}
                    </tr>
                );
            })}
        </tbody>
    );
}
