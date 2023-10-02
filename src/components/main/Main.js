import React from "react";
import Table from "../table/Table";
import Dropzone from "../dropzone/Dropzone";
import CurrentDataContext from '../../contexts/CurrentDataContext';

export default function Main({ children, mainClass }) {
    const { data } = React.useContext(CurrentDataContext);

    return (
        <main className={mainClass}>
            {children}
            <h1 className='section__title'>Create another class</h1>
            <Dropzone />
            {data ? <Table tableHeaders={['', 'Name', 'Email', 'Access key']} /> : <p className="main__text">THERE IS NO DATA TO RENDER!</p>}
        </main>
    );
};
