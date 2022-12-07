import React, { useState, useEffect } from 'react';

const Summary = () => {
    const [quote, setQuote] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            await fetch("http://api.quotable.io/random?tags=inspirational")
                .then(res => {
                    if (res.status === 200) {
                        return res.json()
                    } else {
                        return ""
                    }
                })
                .then(result => {
                    if (result.content) {
                        setQuote(result)
                        setLoading(false)
                    } else {
                        setQuote("The ones who are crazy enough to think they can the world are the ones who do.")
                        setLoading(false)
                    }
                    console.log("Image result is " + result);
                });
        }
        fetchData();
    }, []);

    return (
        <div className="flex flex-col">
            <div className="text-lg text-white ">
                <div className='text-2xl mt-4 mb-1 ml-4 italic'>Good Morning</div>
                <div className='text-5xl ml-4 mt-1 font-bold'>{process.env.REACT_APP_NAME}</div><br /><br />
                {loading ? "Loading.." : <div className='italic ml-4'><div>{quote.content}</div><br />- {quote.author}</div>}
            </div>
        </div>
    );
}

export default Summary;