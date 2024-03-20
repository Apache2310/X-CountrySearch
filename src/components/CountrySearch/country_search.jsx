import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from "./country.module.css";

const CountrySearch = () => {
    const [countries, setCountries] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchCountries = async () => {
            try {
                const response = await axios.get('https://restcountries.com/v3.1/all');
                setCountries(response.data);
            } catch (error) {
                console.error('Error fetching countries:', error);
            }
        };
        fetchCountries();
    }, []);

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    };

    const filteredCountries = countries.filter(country =>
        country.name.common.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className= {styles.container}>
            <input
                type="text"
                placeholder="Search for countries..."
                value={searchTerm}
                onChange={handleSearch}
                className={styles.search}
            />
            <div className={styles.grid}>
                {filteredCountries.map(country => (
                    <div key={country.cca3} className={styles.countryCard}>
                        <img 
                            src={country.flags.png} 
                            alt={`Flag of ${country.name.common}`}
                            className={styles.image} />
                        <p>{country.name.common}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CountrySearch;
