import React from 'react';
import { Row, Col, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import './style.css'
import gif from './assets/gifCrypto.gif'
import { useLogged } from '../auth/Hooks';
import DataTable from 'react-data-table-component';
import { columns as defaultColumns } from '../Crypto/data';
import { convertToInternationalCurrencySystem, format } from '../../utils';
import { AiFillStar } from 'react-icons/ai';
import { useUser } from '../Hooks/useUser';
import { updatedUser } from '../../services/user';

const Watchlist = () => {

  const { logged } = useLogged();
  const { user, setUser } = useUser();

  const handleFavorite = async (id) => {
  
    const _user = { ...user}
    const userIndexList = _user.list.findIndex((crypto) => crypto.id === id);
    _user.list.splice(userIndexList, 1);
    setUser(_user);
    await updatedUser(_user._id, _user);
  }

  const columns = [
    {
    name: '#',
    selector: row => (
    <>
     {user.list ? user.list.map((crypto) => {
        if(crypto.id === row.id) {
          return (
            crypto.id ?
            <AiFillStar  key={`star ${crypto.id}`}  style={{ cursor: 'pointer', marginRight: '1rem',  color: 'rgb(222, 222, 43)'}} onClick={() => handleFavorite(crypto.id)}/>:
            ""
          )
        }
        return null
      })
    : []}
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

    return (
      <>
      {
        !logged ?
        <div style={{ alignItems: 'center', height: '82vh', display: "flex", justifyContent: "center" }}>
          <Row style={{ justifyContent: 'center', alignItems: 'center' }}>
            <Col lg={5}>
              <h3 style={{ fontSize: '3rem' }}>
                Inscrit toi maintenant et follow tes crypto favorites
              </h3>
              <Link to="/register">
                <Button style={{ padding: '1rem' }}>
                  Inscrit toi
                </Button>
              </Link>
            </Col>
            <Col lg={4}>
              <img  width="500" src={gif} alt="gifCrypto" />
            </Col>
          </Row>
        </div> :
         <div style={{ display: 'flex', flexDirection: 'row', justifyContent: "center", paddingLeft: 150, paddingRight: 150, marginTop: 50 }}>
          <DataTable
            data={user ? user.list : []}
            columns={columns}
          />
        </div>
        }
      </>
    );
}

export default Watchlist;