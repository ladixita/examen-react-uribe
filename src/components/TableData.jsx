

const TableData = (props) => {
    //data seran los productos
    const { data, headers } = props
    
  return (
    <table className="table">
        <thead>
            <tr>
               {headers.map((head, index) => (
                <th key={index}>{head.label}</th>
               ))} 
            </tr>
        </thead>
        <tbody>
            { data.map((item) => (
                <tr key={item.id}>
                    {/* <td>{item.id}</td>
                    <td>{item.nombre}</td> */}
                    {headers.map((head, index) => (
                        <td key={index}>
                            {/* {item[head.name]} */}
                            {head.pipe ? (head.pipe(item[head.name])) : item[head.name]}
                        </td>
                    ))}
                </tr>
            ))}
        </tbody>
    </table>
  )
}

export default TableData