const bridgeService = {
    getBridges: async () => {
        const response = await fetch('http://127.0.0.1:5000/test');
        console.log(response);
        return response.json();
    }

   
};

export default bridgeService;