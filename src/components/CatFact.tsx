import {useEffect, useState} from 'react';

const CatFact = () => {
    const [catFact, setCatFact] = useState('');

    useEffect(() => {
        fetch('https://catfact.ninja/fact')
            .then((res) => res.json())
            .then((data) => setCatFact(data.fact))
            .catch(() => setCatFact('Cat fact failed to load. The internet must’ve been clawed. 🙀'));
    }, [])

    return (
        <div className="cat-fact">
            <p>
                <strong>Random cat fact:</strong> <br/>
                {catFact}
            </p>
        </div>
    );
}

export default CatFact;