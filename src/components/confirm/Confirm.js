import React from "react";
import { ButtonSubmit } from "../buttons/Buttons";
import Table from "../table/Table";
import CurrentDataContext from '../../contexts/CurrentDataContext';
import studentApiObj from '../../utils/studentsApi';

export default function Main({ children, mainClass, noConfirmation }) {
    const { data } = React.useContext(CurrentDataContext);

    const handleConfirm = () => {
        if (data) {
            data.map((student) => {
                studentApiObj.createStudent(student)
                    .then((data) => {
                        if (data) {

                        }
                    })
                    .catch((err) => {
                        if (err) {
                            console.error(err);
                        }
                    })
            });
        }
    };

    return (
        <section className={mainClass}>
            {children}
            <p className='confirm__text'>To confirm this action please click "Confirm". once you click on the button the keys will be submitted</p>
            <p className='confirm__text'>Please go through the data created and make sure it is correct.</p>
            <p className='confirm__text'>Please note: once an EMAIL was submitted once it will not be used again.</p>
            <ButtonSubmit
                bgColor={data && data.length !== 0 ? '#ABCDEF' : '#FEDCBA'}
                color={data && data.length !== 0 ? '#5b5b5b' : 'red'}
                title={data && data.length !== 0 ? 'submit' : 'go back'}
                onClick={data && data.length !== 0 ? handleConfirm : noConfirmation}
            />
            {data ? <Table tableHeaders={['', 'Name', 'Email', 'Access key']} /> : <p className="confirm__text">THERE IS NO DATA TO CREATE!</p>}
        </section>
    );
};
