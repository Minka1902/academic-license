import React from 'react';
import CurrentDataContext from '../../contexts/CurrentDataContext';

export default function Table(props) {
    const { tableHeaders } = props;
    const { data } = React.useContext(CurrentDataContext);

    return (
        <div className='table-container'>
            <table>
                <thead>
                    <tr>
                        {tableHeaders.map((header, index) => {
                            return <th key={index}>{header}</th>
                        })}
                    </tr>
                </thead>
                <tbody>
                    {data.map((item, index) => (
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{item.name}</td>
                            <td>{item.email}</td>
                            <td>{item.key}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};
