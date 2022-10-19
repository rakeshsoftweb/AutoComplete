import React, { useState, useEffect } from 'react';
export const DataTable = (props) => {
    const { hdrData, dataSource } = props;
    return (
        <>
            <table className='table table-striped'>
                <thead>
                    <tr>
                        {hdrData.map((hdrItem, hdrIndx) => {
                            const hdrText = `${hdrItem.substr(0, 1).toUpperCase()}${hdrItem.substr(1, hdrItem.length - 1)}`;
                            return (
                                <th key={hdrIndx}>{hdrText}</th>
                            )
                        })}
                    </tr>
                </thead>
                <tbody>
                    {dataSource.map((item, indx) => {
                        return (<tr key={indx}>
                            {hdrData.map((hdrItem, hdrIndx) => {
                                return (<td key={hdrIndx}>{item[hdrItem]}</td>)
                            })
                            }
                        </tr>)
                    })
                    }
                </tbody>
            </table>

        </>
    )
}