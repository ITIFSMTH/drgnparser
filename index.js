// Import libs
const axios = require('axios')

// User data
const session = ""
const sessionSig = ""

// Main func
const getWin = async () => {
    // Create variable
    let win = 0

    for (let i = 0; true; i++) {
        const { data } = await axios.get("https://drgn.pro/srv/api/v1/wallet/history/own", {
            params: {page: i},
            headers: {Cookie: `drgn:sess=${session}; drgn:sess.sig=${sessionSig};`}
        })
        if (data.response.length === 0) break

        for (const operation of data.response) {
            if (operation.status === -1 || operation.status === 0) continue
            if (operation.type === "in") win -= operation.amount
            else win += operation.amount / 10 * 0.97
        }
    }

    console.log("Your win: " + win)
}

// Run main func
getWin()