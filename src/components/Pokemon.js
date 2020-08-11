import React, {useEffect, useState, useCallback} from 'react';
import {
    Card,
    Row,
    Col,
    Badge
} from "react-bootstrap";
import { Link } from 'react-router-dom';
import {ucfirst} from '../utils';

const Pokemon = ({item, ...props}) => {

    const [evo, setEvo] = useState([]);

    const fillEvo = useCallback((data, items = []) => {
        const {evolves_to, species} = data;
        if(!evolves_to || !species) return;
        items.push(species.name);
        evolves_to.map(i => fillEvo(i, items));
        setEvo(items.filter(({name}) => name !== item.name))
    }, [setEvo, item.name]);

    useEffect(() => {
        fillEvo(item.evolutions, [])
    }, [item.evolutions, fillEvo]);

    return (
        <Card {...props} style={{...props.style, boxShadow: `0 0 30px ${item.color || 'transparent'}`}}>
            <Card.Header>
                <Row>
                    <Col>
                        <strong>{ucfirst(item.name)}</strong>
                    </Col>
                    <Col style={{textAlign: 'right'}}>
                        <span><b>Color: </b> {item.color}</span>
                    </Col>
                </Row>
            </Card.Header>
            <Card.Img variant="top" src={item.sprites.front_default} />
            <Card.Body>
                <Row>
                    <Col>
                        <b>Evolutions:</b>
                        <br />
                        {
                            evo.map((name, i) => (
                                <span key={i}>
                                    {!!i && <span>&nbsp;→&nbsp;</span>}
                                    <Link to={`/${name}`}><Badge variant="danger">{ucfirst(name)}</Badge></Link>
                                </span>
                            ))
                        }
                    </Col>
                </Row>
                <hr/>
                <Row>
                    <Col cols={6}>
                        <b>Height: </b>{item.height}
                        <br/>
                        <b>Weight: </b>{item.weight}
                    </Col>
                    <Col cols={6}>
                        <b>Experience: </b>{item.base_experience}
                        <br/>
                        <b>Gender: </b>{item.gender}
                    </Col>
                </Row>
                <hr/>
                <Row>
                    <Col>
                        <b>Abilities:</b>
                        <br/>
                        <ul>
                            {
                                item.abilities.map(({ability}, i) => (
                                    <li key={i}>{ability.name}</li>
                                ))
                            }
                        </ul>
                    </Col>
                    <Col>
                        <b>Types:</b>
                        <br/>
                        <ul>
                            {
                                item.types.map(({type}, i) => (
                                    <li key={i}>{type.name}</li>
                                ))
                            }
                        </ul>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <b>Locations:</b>
                        <br/>
                        {
                            item.locations.map(({location}, i) => (
                                <span key={i}><Badge variant="info">{location.name}</Badge>&nbsp;</span>
                            ))
                        }
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <b>Moves:</b>
                        <br/>
                        {
                            item.moves.map(({move}, i) => (
                                <span key={i}><Badge variant="info">{move.name}</Badge>&nbsp;</span>
                            ))
                        }
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <b>Varieties:</b>
                        <br/>
                        {
                            item.varieties.map(({pokemon}, i) => (
                                <span key={i}><Badge variant="info">{pokemon.name}</Badge>&nbsp;</span>
                            ))
                        }
                    </Col>
                </Row>
            </Card.Body>
        </Card>
    );
};

export default Pokemon;