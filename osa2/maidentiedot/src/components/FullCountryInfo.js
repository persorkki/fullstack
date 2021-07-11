import Weather from "./Weather"

const FullCountryInfo = ({ country }) => {
    return (
      <div>
        <h1>{country.name}</h1>
        <div>capital {country.capital}</div>
        <div>population {country.population}</div>
        <h3>languages</h3>
        <ul>
          {country.languages.map(language => <li key={language.name}>{language.name}</li>)}
        </ul>
        <img alt="flag" width="100" src={country.flag} />
        <Weather country={country}/>
      </div>
    )
}
  
export default FullCountryInfo