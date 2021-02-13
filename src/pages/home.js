import React from 'react'

class Home extends React.Component {
    state = {
        name: '',
        symbol: '',
        purchasePrice: null,
        purchaseAmount: null,
        currentPrice: null,
    }
    render = () => {
        return (
            <React.Fragment>
                <h1>Welcome to Coin Purse</h1>

            </React.Fragment>
        )
    }
}

export default Home
