const bridgeService = {
    getBridges: async () => {
        const response = await fetch('http://127.0.0.1:5000/test');
        console.log(response);
        // const data = await response.json();
        // console.log(data);
        return response.json();
        // return data;
    }
};

export default bridgeService;