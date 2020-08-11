import React, {useEffect, useState} from 'react';
import {Alert, Row, Col} from 'react-bootstrap';
import {useSelector} from 'react-redux';
import SearchForm from "../components/forms/SearchForm";
import Pokemon from "../components/Pokemon";

const Home = () => {
    const item = useSelector(state => state?.pokemon?.item);
    const errorMessage = useSelector(state => state?.pokemon?.error);
    const recent = useSelector(state => state?.pokemon?.recent);
    const [recentItems, setRecentItems] = useState([]);

    useEffect(() => {
        setRecentItems(recent.filter(it => it.id !== item.id))
    }, [recent, item]);

    return (
        <div style={{width: '80%', margin: '40px auto'}}>
            <h1 style={{textAlign: 'center'}}>Find your pokemon !</h1>
            <br/>
            <Row>
                <Col xs={6} style={{margin: 'auto'}}>
                    <SearchForm />
                </Col>
            </Row>
            <br/>
            {
                errorMessage && (
                    <Alert variant={'danger'}>
                        {errorMessage || 'Pokemon not found'}
                    </Alert>
                )
            }
            {
                item && <Pokemon item={item} style={{width: '30rem', margin: 'auto'}} />
            }
            {
                !!recentItems.length && (
                    <>
                        <h4>Recent pokemons:</h4>
                        <Row>
                            { recentItems.map((item, i) => (
                                <Col key={i} xs={3}>
                                    <Pokemon item={item} />
                                </Col>
                            )) }
                        </Row>
                    </>
                )
            }
        </div>
    );
};

export default Home;