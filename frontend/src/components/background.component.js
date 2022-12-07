import React, { useEffect, useState } from 'react';
import { PropTypes } from 'prop-types';

const Background = (props) => {
    const [imgUrl, setImgUrl] = useState([]);

    useEffect(() => {
        const fetchImg = async () => {
            await fetch(`https://api.unsplash.com/photos/random/?client_id=${process.env.REACT_APP_UNSPLASH_ACCESS_KEY}&query=motivation`)
                .then(res => {
                    if (res.status === 200) {
                        return res.json()
                    } else {
                        return "/background.jpg"
                    }
                })
                .then(result => {
                    if (result.urls) {
                        setImgUrl(result.urls.regular)
                    } else {
                        setImgUrl(result)
                    }
                    console.log("Image result is " + result);
                });
        }
        fetchImg();
    }, []);

    //Defining styles
    const styles = {
        header: {
            backgroundImage: `url(${imgUrl})`,
            height: '100vh',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover'
        },

        content: {
            height: '100%',
            width: '100%',
            height: '100vh',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
        }
    }

    return (
        <div style={styles.header}>
            <div className=" text-white" style={styles.content}>
                {props.children}
            </div>
        </div>
    )
}

// Background.propTypes = {
//     children: PropTypes.node.isRequired
// }

// Background.defaultProps = {
//     children: null
// }

export default Background