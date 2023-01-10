import React from 'react';
import { Button, Row, Col } from 'react-bootstrap'
import DataTable from 'react-data-table-component';
// import Chart from '../../components/Charts';
import { useFavorite } from '../../components/Hooks/useFavorite';
import { columns as defaultColumns } from './data';
import { Spinner } from 'react-bootstrap';
import './style.css'


const Home = () => {

  const { cryptoList } = useFavorite();

  const cryptoListFiltering = cryptoList.filter((crypto, index) => index < 5)

  const columns = [
    ...defaultColumns,
    // {
    //   name: "Graphiques",
    //   width: "25%",
    //   cell: row =><Chart/>
    // }
  ]

  return (
    <div style={{ alignItems: 'center', height: '91vh', display: 'flex' }}>
      <Row style={{ justifyContent: 'center', alignItems: 'center' }}>
        <Col lg={5}>
          <h3 style={{ fontSize: '3rem' }}>
            Commencez votre portefeuille de cryptomonnaies
          </h3>
          <Button variant="primary"
            style={{ padding: '1rem' }}
            href="/crypto"
          >
            Explorer les cryptomonnaies
          </Button>
        </Col>
        <Col lg={5}>
          {
            cryptoList.length === 0 ?
            <Spinner animation="border" variant="primary" style={{ display: 'flex', marginRight: 'auto', marginLeft: 'auto' }}/> :
            <DataTable
              data={cryptoListFiltering}
              columns={columns}
            />
          }
        </Col>
      </Row>
    </div>
  );
};

export default Home;