import React from 'react';
import { Card, Col, Row } from 'react-bootstrap';
import Chart from '../../components/Charts';
import { getAllCrypto, getCryptoById } from '../../services/crypto';
import { Spinner } from 'react-bootstrap';
import { convertToInternationalCurrencySystem, format } from '../../utils';

const CryptoData = () => {

  const cryptoValue = window.location.pathname.split("/").pop();
  const [chartValue, setChartValue] = React.useState([]);
  const [addDataAboutCrypto, setAddDataAboutCrypto] = React.useState([]);

  const loadCryptoData = React.useCallback(() => {
    (async () => {

      const _cryptoValue = await getCryptoById(cryptoValue);

      const allCrypto = await getAllCrypto()

      const filterByCryptoId = allCrypto.crypto.filter((crypto) => crypto.id === cryptoValue)

      const formatCryptoList = filterByCryptoId.map((crypto) => {
        return (
          {
            id: crypto.id,
            name: crypto.name,
            symbol: crypto.symbol,
            image: crypto.image.small,
            current_price: crypto.market_data.current_price.eur,
            price_change_percentage_24h: crypto.market_data.price_change_percentage_24h,
            market_cap_rank: crypto.market_data.market_cap_rank,
            market_cap: crypto.market_data.market_cap.eur,
            total_volume: crypto.market_data.total_volume.eur,
            circulating_supply: crypto.market_data.circulating_supply,
            total_supply: crypto.market_data.total_supply,
          }
        )
      })

      const filterByCrypto = _cryptoValue.tickers.filter((crypto) =>
        crypto.coin_id === cryptoValue && crypto.target === 'EUR'
      );

      const formatChart = filterByCrypto.map((crypto) => {
        return (
          {
            name: crypto.base,
            value: crypto.last,
          }
        )
      })
      setAddDataAboutCrypto(formatCryptoList)
      setChartValue(formatChart);
    })();
  }, [cryptoValue]);

  React.useEffect(() => loadCryptoData(), [loadCryptoData]);

  return (
    <div style={{ flexDirection: 'column', justifyContent: 'around' }}>
      {addDataAboutCrypto.length === 0 ?
        <Spinner animation="border" variant="primary" style={{ display: 'flex', marginRight: 'auto', marginLeft: 'auto' }} /> :


        <div style={{ display: 'flex', flexDirection: 'row' }}>
          <div style={{ height: 400, width: '100%', marginTop: -183 }}>
            <Card style={{ width: "100%", height: '100%', display: 'content' }}>
              <Card.Body>
                <Chart values={chartValue} />
              </Card.Body>
            </Card>
          </div>
          <Col md={4}>
            {
              addDataAboutCrypto.map((crypto) => {
                return (
                  <>
                    {
                      <div>
                        <img src={crypto.image} alt={crypto.name} style={{ width: '5rem' }} />
                        <span style={{ fontSize: '2rem' }}>{crypto.name}</span>
                      </div>
                    }
                    <Row className='mb-3'>
                      <Col md={6} style={{ height: '8rem' }}>
                        <Card style={{ width: "100%", height: '100%', display: 'flex', flexDirection: 'column' }} className="text-center">
                          <Card.Body style={{ display: 'flex', flexDirection: 'column' }}>
                            <Card.Subtitle className="mb-2 text-muted">Market Cap (EUR)</Card.Subtitle>
                            <Card.Text style={{ color: "#0d6efd" }} >
                              {convertToInternationalCurrencySystem(crypto.market_cap)}
                            </Card.Text>
                          </Card.Body>
                        </Card>
                      </Col>
                      <Col md={6} style={{ height: '8rem' }}>
                        <Card style={{ width: "100%", height: '100%' }} className="text-center">
                          <Card.Body  style={{ display: 'flex', flexDirection: 'column' }}>
                            <Card.Subtitle className="mb-2 text-muted">24H VOLUME (EUR)</Card.Subtitle>
                            <Card.Text style={{ color: "#0d6efd" }}>
                              {convertToInternationalCurrencySystem(crypto.total_volume)}
                            </Card.Text>
                          </Card.Body>
                        </Card>
                      </Col>
                    </Row>
                    <Row className='mb-3'>
                      <Col md={6} style={{ height: '8rem' }}>
                        <Card style={{ width: "100%", height: '100%' }} className="text-center">
                          <Card.Body  style={{ display: 'flex', flexDirection: 'column' }}>
                            <Card.Subtitle className="mb-2 text-muted">Circulating Supply</Card.Subtitle>
                            <Card.Text style={{ color: "#0d6efd" }}>
                              {format(crypto.circulating_supply)}
                            </Card.Text>
                          </Card.Body>
                        </Card>
                      </Col>
                      <Col md={6} style={{ height: '8rem' }}>
                        <Card style={{ width: "100%", height: '100%' }} className="text-center">
                          <Card.Body  style={{ display: 'flex', flexDirection: 'column' }}>
                            <Card.Subtitle className="mb-2 text-muted">Max Supply</Card.Subtitle>
                            <div>
                              <Card.Text style={{ color: "#0d6efd" }}>
                                {format(crypto.total_supply)}
                              </Card.Text>
                            </div>
                          </Card.Body>
                        </Card>
                      </Col>
                    </Row>
                  </>
                )
              }
              )
            }
            <Row>
              <Col style={{ height: '8rem' }}>
                <Card style={{ width: "100%", height: '100%' }} className="text-center">
                  <Card.Body>
                    <Card.Subtitle className="mb-2 text-muted">Card Subtitle</Card.Subtitle>
                    <Card.Text>
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Col>
        </div>
      }
    </div>
  );
};

export default CryptoData;