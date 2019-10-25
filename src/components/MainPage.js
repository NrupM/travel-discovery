import React, { Component } from 'react';
import PopularLocations from './PopularLocations';
import FeaturedLocations from './FeaturedLocations';
import SearchBar from './SearchBar';
import { textVariants } from '../config/textVariants';
import {
  POPULAR_DESTINATIONS_URL,
  FEATURED_DESTINATIONS_URL
} from '../config/config.js';
import { Grid, Row, Col } from 'react-bootstrap';
import '../styles/styles.css';

export default class MainPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      filter: '',
      popularLocations: [],
      featuredLocations: [],
      isLoading: false
    };

    this.transformResponseToArray = this.transformResponseToArray.bind(this);
  }

  async transformResponseToArray(response) {
    const reader = response.body.getReader();

    const contentLength = +response.headers.get('Content-Length');

    // Step 1: read the data
    let receivedLength = 0; // received this number of bytes at the moment
    let chunks = []; // array of the received binary chunks (comprises the body)
    while (true) {
      const { done, value } = await reader.read();

      if (done) {
        break;
      }

      chunks.push(value);
      receivedLength += value.length;

      console.log(`Received ${receivedLength} of ${contentLength}`);
    }

    // Step 2: concatenate chunks into single Uint8Array
    let chunksAll = new Uint8Array(receivedLength); // (2.1)
    let position = 0;
    for (let chunk of chunks) {
      chunksAll.set(chunk, position); // (2.2)
      position += chunk.length;
    }

    // Step 3: decode chunks into a string
    let result = new TextDecoder('utf-8').decode(chunksAll);

    // Transformation complete!
    return JSON.parse(result).data;
  }

  async componentDidMount() {
    this.setState({ isLoading: true });

    let featuredLocations = [];
    let popularLocations = [];

    try {
      const featuredResponse = await fetch(FEATURED_DESTINATIONS_URL);
      const popularResponse = await fetch(POPULAR_DESTINATIONS_URL);

      featuredLocations = await this.transformResponseToArray(featuredResponse);
      popularLocations = await this.transformResponseToArray(popularResponse);

      this.setState({ featuredLocations, popularLocations, isLoading: false });
    } catch (err) {
      this.setState({ error: err.message });
    }
  }

  handleInputChange = event => {
    this.setState({ filter: event.target.value });
  };

  render() {
    const {
      filter,
      popularLocations,
      featuredLocations,
      isLoading
    } = this.state;

    const lowerCasedFilter = filter.toLowerCase();
    const filteredPopularLocations = popularLocations
      ? popularLocations.filter(location => {
          return Object.keys(location).some(key =>
            location[key].toLowerCase().includes(lowerCasedFilter)
          );
        })
      : null;

    if (isLoading) {
      return <div>{textVariants['loadingText']}</div>;
    }

    return (
      <Grid className='mainPage'>
        <Row>
          <Col xs={12} sm={12} md={12}>
            {this.state.error && <div>{this.state.error}</div>}
            {!this.state.error && (
              <div className='search'>
                <SearchBar
                  filter={filter}
                  handleInputChange={this.handleInputChange}
                />{' '}
                <div className='resultsContainer'>
                  {popularLocations && (
                    <PopularLocations
                      filteredPopularLocations={filteredPopularLocations}
                    />
                  )}
                  {featuredLocations && (
                    <FeaturedLocations
                      featuredLocations={this.state.featuredLocations}
                    />
                  )}
                </div>
              </div>
            )}
          </Col>
        </Row>
      </Grid>
    );
  }
}
