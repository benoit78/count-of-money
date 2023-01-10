import React from 'react';
import DataTable from 'react-data-table-component';
import { columns as defaultColumns } from './data';
import { AiOutlineStar, AiFillStar } from 'react-icons/ai';
import './style.css'
import { useLogged } from '../auth/Hooks';
import { convertToInternationalCurrencySystem, format } from '../../utils';
import { useFavorite } from '../../components/Hooks/useFavorite';
import { Spinner } from 'react-bootstrap';
import { useUser } from '../Hooks/useUser';
import { useCrypto } from '../../components/Hooks/useCrypto';

const Crypto = () => {

    const { cryptoList, favorite } = useFavorite();
    const { logged } = useLogged();
    const { user } = useUser();

    const { handleCryptoClick  } = useCrypto();


    const columns = [
        {
        name: '#',
        selector: row => (
        <>
         {logged ?
          cryptoList.map((element) => {
            const findIndex = user.list ? user.list.findIndex((crypto) => crypto.id === element.id) : [];
            if(element.id === row.id ) {
              return (
                user.list && findIndex >= 0 ?
                user.list[findIndex].id === element.id ?
                <AiFillStar style={{ cursor: 'pointer', marginRight: '1rem',  color: 'rgb(222, 222, 43)'}} key={`star ${element.id}`}  onClick={() => favorite(element.id)}/> :
                <AiOutlineStar  style={{  cursor: 'pointer', marginRight: '1rem'}} key={`star ${element.id}`}   onClick={() => favorite(element.id)}/> :
                <AiOutlineStar  style={{  cursor: 'pointer', marginRight: '1rem'}} key={`star ${element.id}`}   onClick={() => favorite(element.id)}/>
              )
            }
            return null
          }):
          ""
        }
        {row.market_cap_rank}
        </>),
        width: "10%",
      },
      ...defaultColumns,
      {
        name: "plafond du marché",
        width: "10%",
        cell: row => convertToInternationalCurrencySystem(row.market_cap)
      },
      {
          name: "Offre en circulation",
          width: "20%",
          cell: row => (<>{`${format(row.circulating_supply)} ${row.symbol.toUpperCase()}`}</>)
      }
      ]

    //   const customStyles = {
    //     rows: {
    //         style: {
    //           '&:hover': {
    //             cursor: 'pointer',
    //           }, // override the row height
    //         },
    //     },
    //     // headCells: {
    //     //     style: {
    //     //         paddingLeft: '8px', // override the cell padding for head cells
    //     //         paddingRight: '8px',
    //     //     },
    //     // },
    //     cells: {
    //       style: {
    //         '&:hover': {
    //           cursor: 'pointer',
    //         },
    //       },
    //     },
    // };

    // const handleCryptoClick = (row) => {
    //     setCryptoValue(row.id)
    //     navigate(`/crypto/${row.id}`)
    // }

    return (
      <>
       <div style={{ display: 'flex', flexDirection: 'row', justifyContent: "center", paddingLeft: 150, paddingRight: 150, marginTop: 50 }}>
            {
              cryptoList.length === 0 ?
              <Spinner animation="border" variant="primary" style={{ display: 'flex', marginRight: 'auto', marginLeft: 'auto' }}/> :
                <DataTable
                  data={cryptoList}
                  columns={columns}
                  onRowClicked={handleCryptoClick}
                  // conditionalRowStyles={customStyles}
                />
            }
        </div>
      </>
    );
};

export default Crypto;