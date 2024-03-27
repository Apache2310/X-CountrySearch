import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./country.css";

const CountrySearch = () => {
    const [countries, setCountries] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("https://restcountries.com/v3.1/all");
                const data = response.data;
                setCountries(data);
            } catch (error) {
                console.error("Error fetching data: ", error);
            }
        };
        fetchData();
    }, []);

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    };

    const filteredCountries = countries.filter(country =>
        country.name.common.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className= 'container'>
            <input
                type="text"
                placeholder="Search for countries..."
                value={searchTerm}
                onChange={handleSearch}
                className='search'
            />
            
            <div className='grid'>
                {filteredCountries.map(country => (
                    <div key={country.cca3} className='countryCard'>
                        <img 
                            src={country.flags.png} 
                            alt={`Flag of ${country.name.common}`}
                            className='image' 
                        />
                        <p>{country.name.common}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CountrySearch;

