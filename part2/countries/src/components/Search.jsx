import { useState} from "react";

const Search = ({search, setSearch}) => {

    const onChange = (event) => {
        setSearch(event.target.value)
    }

    return (
        <div>
            find countries  <input type="text" value={search} onChange={onChange}></input>
        </div>
    )
}

export default Search