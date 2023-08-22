const Display = ({ searchFilter }) => {
    console.log(searchFilter.length)
    if (searchFilter.length > 10) {
        return (
        <p>Too many matches, specify another filter</p>
        )
    
    }
    else if (searchFilter.length > 1 && searchFilter.length <= 10) {
        return searchFilter.map(country => <li key={country.name.common}>{country.name.common}</li>)
    }
    else if (searchFilter.length === 1) {
        let country = searchFilter[0]
        return (
            <div>
                <h1>{country.name.common}</h1>
                <p>capital {country.capital}</p>
                <p>area {country.area}</p>

                <h3>languages:</h3>
                <ul>
                    {Object.values(country.languages).map((language) => (
                        <li key={country.name.common}>{language}</li>
                    ))}
                </ul>
                <img src={country.flags.png}></img>
            </div>
        )
    }
}

export default Display