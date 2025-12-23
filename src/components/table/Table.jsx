import React, { useEffect, useState } from 'react'
import "./Table.css"
import { RiDeleteBin2Line } from "react-icons/ri";

function Table() {


    const [data, setData] = useState([])


    /**
         * get mitarbeiter daten
         */
    const deleteData = (id) => {
        fetch(`api/delete/${id}`,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            }
        )
            .then(function (response) {
                console.log(response)
                return response.json()
            })
            .then(function (jsonResponse) {
                console.log(jsonResponse)
                setData(jsonResponse)
            });
    }


    /**
     * get mitarbeiter daten
     */
    const getData = () => {
        fetch('api/mitarbeiterliste',
            {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            }
        )
            .then(function (response) {
                console.log(response)
                return response.json()
            })
            .then(function (jsonResponse) {
                console.log(jsonResponse)
                setData(jsonResponse)
            });
    }
    /**
     * set data am anfang in state
     */
    useEffect(() => {
        getData()
    }, [])

    return (

        <table className='table'>
            <thead>
                <tr>
                    <th className='header__item'>
                        <span>ID</span>
                    </th>
                    <th className='header__item'>
                        <span>Vorname</span>
                    </th>
                    <th className='header__item'>
                        <span>Nachname</span>
                    </th>
                    <th className='header__item'>
                        <span>Email </span>
                    </th>
                    <th className='header__item'>
                        <span>Datum </span>
                    </th>
                    <th className='header__item'>
                        <span>Verwalten</span>
                    </th>

                </tr>
            </thead>
            <tbody>


                {data.map((obj, index) => (
                    <tr key={index}>
                        <td>{obj.id}</td>
                        <td>{obj.vorname}</td>
                        <td>{obj.nachname}</td>
                        <td>{obj.email}</td>
                        <td>{obj.timestamp}</td>
                        <td>
                            <a onClick={() => deleteData(obj.id)}>
                                <RiDeleteBin2Line />
                            </a>

                        </td>
                    </tr>
                ))}


            </tbody>
        </table >

    )
}

export default Table;